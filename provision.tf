provider "aws" {
  region     = "us-west-2"
  profile    = "cj-deployer"
}

resource "aws_instance" "id_service" {
  ami           = "ami-095cd038eef3e5074"
  instance_type = "t2.micro"
  key_name      = "id_service_aws_key"
  vpc_security_group_ids = [
    "sg-032dc091c08ef351f"
  ]
  user_data     = "${file("install-docker.sh")}"
}

resource "aws_eip" "ip" {
  instance = "${aws_instance.id_service.id}"
}

output "instance_ips" {
  value = ["${aws_eip.ip.*.public_ip}"]
}
