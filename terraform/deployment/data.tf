data "local_file" "deployment" {
  filename = "${var.source_path}/deployment.yaml"
}
data "local_file" "httproute" {
  filename = "${var.source_path}/httproute.yaml"
}
data "local_file" "service" {
  filename = "${var.source_path}/service.yaml"
}
data "local_file" "serviceaccount" {
  filename = "${var.source_path}/serviceaccount.yaml"
}