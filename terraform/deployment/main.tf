resource "local_file" "deployment" {
  content  = data.local_file.deployment.content
  filename = "${var.destination_path}/deployment.yaml"
}

resource "local_file" "httproute" {
  content  = data.local_file.httproute.content
  filename = "${var.destination_path}/httproute.yaml"
}

resource "local_file" "service" {
  content  = data.local_file.service.content
  filename = "${var.destination_path}/service.yaml"
}

resource "local_file" "serviceaccount" {
  content  = data.local_file.serviceaccount.content
  filename = "${var.destination_path}/serviceaccount.yaml"
}