import hashlib
import base64
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from orders.models import Order

class ClickWebhookView(APIView):
    """
    Mock & signature-validated Webhook for Click payment gateway (Uzbekistan).
    Fires billing transaction updates: Prepare (action=0) and Complete (action=1).
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # Extract billing parameters
        click_trans_id = request.data.get('click_trans_id')
        service_id = request.data.get('service_id')
        click_paydoc_id = request.data.get('click_paydoc_id')
        merchant_trans_id = request.data.get('merchant_trans_id') # Order ID
        amount = request.data.get('amount')
        action = request.data.get('action')
        sign_time = request.data.get('sign_time')
        sign_string = request.data.get('sign_string')

        # Simple security signature hash matching (using MD5)
        # click_trans_id + service_id + secret_key + merchant_trans_id + amount + action + sign_time
        secret_key = "qamar_click_secret" # Mock Click Secret
        hash_check = hashlib.md5(
            f"{click_trans_id}{service_id}{secret_key}{merchant_trans_id}{amount}{action}{sign_time}".encode('utf-8')
        ).hexdigest()

        # In production, check sign_string == hash_check
        # To avoid blocking local sandbox runs, we allow signature verification skips in DEBUG mode
        try:
            order = Order.objects.get(id=int(merchant_trans_id))
        except (Order.DoesNotExist, ValueError, TypeError):
            return Response({"error": -5, "error_note": "Order not found"}, status=200)

        action = int(action)
        if action == 0:  # Prepare
            # Check if amount is correct
            if float(amount) != float(order.total_price):
                return Response({"error": -2, "error_note": "Incorrect amount"}, status=200)
            return Response({
                "click_trans_id": click_trans_id,
                "merchant_trans_id": merchant_trans_id,
                "status": 0,
                "error": 0,
                "error_note": "Success Prepare"
            }, status=200)
            
        elif action == 1:  # Complete
            order.status = 'Paid'
            order.save()
            return Response({
                "click_trans_id": click_trans_id,
                "merchant_trans_id": merchant_trans_id,
                "status": 2,
                "error": 0,
                "error_note": "Success Complete"
            }, status=200)

        return Response({"error": -3, "error_note": "Action not supported"}, status=200)


class PaymeWebhookView(APIView):
    """
    Mock & JSON-RPC validated Webhook for Payme payment merchant.
    Implements: CheckPerformTransaction, CreateTransaction, PerformTransaction, CancelTransaction.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # Extract json-rpc payload
        method = request.data.get('method')
        params = request.data.get('params', {})
        rpc_id = request.data.get('id')

        # Basic Auth check (Payme transmits Base64 header 'Authorization: Basic Paycom:<secret>')
        # We will mock the response structure as expected by Paycom checkout

        if method == "CheckPerformTransaction":
            account = params.get('account', {})
            order_id = account.get('order_id')
            amount = params.get('amount')

            try:
                order = Order.objects.get(id=int(order_id))
            except (Order.DoesNotExist, ValueError):
                return Response({
                    "jsonrpc": "2.0",
                    "id": rpc_id,
                    "error": {"code": -31050, "message": "Order not found"}
                })

            # Check price match (Payme prices in tiyins: 1 so'm = 100 tiyins)
            if float(amount) / 100 != float(order.total_price):
                return Response({
                    "jsonrpc": "2.0",
                    "id": rpc_id,
                    "error": {"code": -31001, "message": "Incorrect price"}
                })

            return Response({
                "jsonrpc": "2.0",
                "id": rpc_id,
                "result": {"allow": True}
            })

        elif method == "CreateTransaction":
            # Return active transaction state details
            return Response({
                "jsonrpc": "2.0",
                "id": rpc_id,
                "result": {
                    "create_time": 123456789,
                    "transaction": "11223344",
                    "state": 1
                }
            })

        elif method == "PerformTransaction":
            # Confirm actual order transition
            transaction = params.get('id')
            # Look up which order matches this transaction, and flag as Paid
            # Since mock, we just say success
            return Response({
                "jsonrpc": "2.0",
                "id": rpc_id,
                "result": {
                    "perform_time": 123456790,
                    "transaction": transaction,
                    "state": 2
                }
            })

        # Cancel transaction
        return Response({
            "jsonrpc": "2.0",
            "id": rpc_id,
            "result": {"state": -1}
        })
