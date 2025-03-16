
# # Build and push Analysis Service
docker build -t advanceduno/analysisservice:latest -f AnalysisService/Dockerfile AnalysisService/
docker push advanceduno/analysisservice:latest

# Build and push JobService.Grpc
docker build -t advanceduno/orderservice:latest -f OrderService/Dockerfile OrderService/
docker push advanceduno/orderservice:latest





Write-Output "All images built and pushed successfully!"