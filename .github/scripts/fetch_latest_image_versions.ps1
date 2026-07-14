param(
    [Parameter(Mandatory = $true)]
    [string]$registryNamespace,

    [Parameter(Mandatory = $true)]
    [string[]]$imageNames,

    [Parameter(Mandatory = $true)]
    [string]$inputTag
)

Set-StrictMode -Version 3.0
$ErrorActionPreference = "Stop"

if ($imageNames.Count -gt 5) {
    Write-Error "Maximum 5 images supported. Received $($imageNames.Count)."
    exit 1
}

function Get-RegistryNamespace {
    param([string]$Name)
    $namespaces = scw registry namespace list name=$Name -o json | ConvertFrom-Json
    $namespace = $namespaces | Where-Object { $_.name -eq $Name } | Select-Object -First 1
    if ($null -eq $namespace) {
        Write-Error "Namespace '$Name' not found."
        exit 1
    }
    return $namespace
}

function Get-RegistryImage {
    param([string]$NamespaceId, [string]$ImageName)
    $images = scw registry image list "namespace-id=$NamespaceId" "name=$ImageName" -o json | ConvertFrom-Json
    $image = $images | Where-Object { $_.name -eq $ImageName } | Select-Object -First 1
    if ($null -eq $image) {
        Write-Error "Image '$ImageName' not found in namespace."
        exit 1
    }
    return $image
}

function Get-ImageTags {
    param([string]$ImageId)
    return scw registry tag list "image-id=$ImageId" order-by=created_at_desc -o json | ConvertFrom-Json
}

function Resolve-ImageTag {
    param([string]$ImageName, [object[]]$Tags, [string]$InputTag)
    if ($InputTag -eq 'latest') {
        $resolved = $Tags | Where-Object { $_.name -ne 'latest' } | Select-Object -First 1 -ExpandProperty name
        if ([string]::IsNullOrEmpty($resolved)) {
            Write-Error "No non-'latest' tags found for image '$ImageName'."
            exit 1
        }
        Write-Host "  Resolved 'latest' -> $resolved"
        return $resolved
    }

    $match = $Tags | Where-Object { $_.name -eq $InputTag } | Select-Object -First 1
    if ($null -eq $match) {
        $available = ($Tags | Select-Object -ExpandProperty name) -join ', '
        Write-Error "Tag '$InputTag' not found for image '$ImageName'. Available: $available"
        exit 1
    }
    Write-Host "  Verified tag: $InputTag"
    return $InputTag
}

# --- Main ---

Write-Host "Namespace : $registryNamespace"
Write-Host "Images    : $($imageNames -join ', ')"
Write-Host "Input tag : $inputTag"
Write-Host ""

$namespace = Get-RegistryNamespace -Name $registryNamespace

for ($i = 0; $i -lt $imageNames.Count; $i++) {
    $imageName = $imageNames[$i]
    $outputKey = "$($imageName)_version"

    Write-Host "$outputKey $imageName"

    $image  = Get-RegistryImage -NamespaceId $namespace.id -ImageName $imageName
    $tags   = Get-ImageTags -ImageId $image.id
    $resolvedTag = Resolve-ImageTag -ImageName $imageName -Tags $tags -InputTag $inputTag

    "$outputKey=$resolvedTag" | Out-File -FilePath $env:GITHUB_OUTPUT -Encoding utf8 -Append
    Write-Host "  Output: $outputKey=$resolvedTag"
}

Write-Host ""
Write-Host "Done. $($imageNames.Count) image version(s) resolved."
