/**
 * Detecta automáticamente el mapeo de columnas basado en nombres
 */
export function detectColumnMapping(headers) {
  const mapping = {}

  const fieldPatterns = {
    name: ['nombre', 'name', 'cliente', 'customer', 'full_name', 'fullname', 'persona', 'solicitante'],
    email: ['email', 'correo', 'email_address', 'e-mail', 'mail'],
    phone: ['teléfono', 'phone', 'telefono', 'celular', 'mobile', 'tel'],
    product: ['producto', 'product', 'product_name', 'item', 'articulo', 'descripcion'],
    quantity: ['cantidad', 'quantity', 'qty', 'cant', 'unidades'],
    value: ['valor', 'value', 'precio', 'price', 'amount', 'total', 'cart_value', 'monto'],
    date: ['fecha', 'date', 'created_at', 'createdAt', 'date_time', 'datetime', 'fechacreacion'],
    status: ['estado', 'status', 'state', 'condicion', 'estatus']
  }

  headers.forEach(header => {
    const lowerHeader = header.toLowerCase().trim()

    for (const [field, patterns] of Object.entries(fieldPatterns)) {
      for (const pattern of patterns) {
        if (lowerHeader.includes(pattern.toLowerCase())) {
          if (!mapping[field]) {
            mapping[field] = header
          }
          break
        }
      }
    }
  })

  return mapping
}
