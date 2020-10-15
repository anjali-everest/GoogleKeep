resource "aws_instance" "ec2" {
  ami           = "ami-03657b56516ab7912"
  instance_type = "t2.micro"
  vpc_security_group_ids = [
      "sg-0a421d37ad9b43d43"
  ]
  key_name = "WebServer01"
  tags          = {
    Name        = "Google Keep Application Server"
  }
}

output "ip" {
  value = "${aws_instance.ec2.*.public_ip}"
}