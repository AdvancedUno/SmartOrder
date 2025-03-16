
kubectl apply -f k8s/
kubectl apply -f k8s/database/


kubectl apply -f OrderService/k8s/

kubectl apply -f AnalysisService/k8s/

echo "All manifests applied successfully!"