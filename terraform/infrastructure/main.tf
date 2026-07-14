resource "scaleway_domain_record" "a_records" {
  for_each = toset(local.cluster_domains)

  dns_zone = "regnerdet.nu"
  name     = each.value
  type     = "A"
  data     = "51.15.251.138"
  ttl      = 3600
}