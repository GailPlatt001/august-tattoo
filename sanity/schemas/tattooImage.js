export default {
  name: 'tattooImage',
  title: 'Tattoo Image',
  type: 'document',
  fields: [
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
    { name: 'alt', title: 'Alt Text', type: 'string' },
    {
  name: 'categories',
  title: 'Categories',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    list: [
      { title: 'Neo-Traditional', value: 'Neo-Traditional' },
      { title: 'Black & Grey', value: 'Black & Grey' },
      { title: 'Delicate', value: 'Delicate' },
      { title: 'Small Tattoos', value: 'Small Tattoos' },
      { title: 'Other', value: 'Other' },
    ],
    layout: 'tags',
  },
},
    { name: 'featured', title: 'Featured on Home', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number', description: 'Lower shows first.' },
  ],
  preview: { select: { media: 'photo', title: 'alt' } },
};
