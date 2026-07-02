export default function StructuredData({ schema }) {
  if (!schema) {
    return null
  }

  const schemas = Array.isArray(schema) ? schema : [schema]

  return schemas.map((item, index) => (
    <script key={`${item['@type'] ?? 'schema'}-${index}`} type="application/ld+json">
      {JSON.stringify(item)}
    </script>
  ))
}
