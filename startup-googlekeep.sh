docker-compose build
docker-compose up -d
cd sqitch
curl -L https://git.io/JJKCn -o sqitch && chmod +x sqitch
./sqitch deploy 