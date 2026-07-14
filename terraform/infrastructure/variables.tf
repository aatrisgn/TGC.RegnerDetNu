variable "project_name" {
  type = string
}
variable "organization_id" {
  description = "ID of the Scaleway organization"
  type        = string
  validation {
    condition     = can(regex("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", var.organization_id))
    error_message = "The variable value must be a valid GUID in the format 00000000-0000-0000-0000-000000000000."
  }
}

variable "environment" {
  description = "The environment for the landing zone"
  type        = string
  validation {
    condition     = var.environment == "dev" || var.environment == "prd"
    error_message = "The variable value must be either 'dev' or 'prd'."
  }
}
