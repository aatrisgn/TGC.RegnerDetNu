module "deployment_files" {
  source = "./modules/deployment_file"
  for_each = { for val in local.deployment_files : val => val }

  source_path = "${var.source_path}"
  destination_path = "${var.destination_path}"
  file_name = each.value
}