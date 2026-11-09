/**
 * Client half of dsh-remotion-studio.
 *
 * Registers a sidebar entry and a main panel:
 * - sidebar.panellist adds the Remotion Studio icon to the left sidebar.
 * - main renders the panel when that icon is selected.
 */
window.__ModuleLoader__.load({
  id: '@iamsuosi/dsh-remotion-studio',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const PANEL_ID = 'remotion-studio'
    const PANEL_ORDER = 55

    const THEMES = [
      { id: 'plugin-promo', name: 'Plugin Promo', purpose: 'Plugin launch / product promo' },
      { id: 'explainer', name: 'Explainer', purpose: 'Narrative explainers (placeholder)' },
      { id: 'minimal', name: 'Minimal', purpose: 'Clean text-only fallback' },
    ]

    function FilmGlyph(props) {
      const size = props && typeof props.size === 'number' && props.size > 0 ? props.size : 16
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.75,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        style: { display: 'block' }
      }, [
        h('rect', { key: 'r1', x: '2', y: '2', width: '20', height: '20', rx: '2.18' }),
        h('path', { key: 'p1', d: 'M7 2v20' }),
        h('path', { key: 'p2', d: 'M17 2v20' }),
        h('path', { key: 'p3', d: 'M2 12h20' }),
        h('path', { key: 'p4', d: 'M2 7h5' }),
        h('path', { key: 'p5', d: 'M2 17h5' }),
        h('path', { key: 'p6', d: 'M17 17h5' }),
        h('path', { key: 'p7', d: 'M17 7h5' })
      ])
    }

    const STYLES = {
      panel: { height: '100%', width: '100%', boxSizing: 'border-box', padding: '20px', overflow: 'auto', background: 'var(--dsw-alias-bg-base)', color: 'var(--dsw-alias-label-primary)' },
      header: { marginBottom: '24px' },
      title: { fontSize: '22px', fontWeight: 600, margin: '0 0 6px' },
      subtitle: { fontSize: '13px', opacity: 0.7, margin: 0 },
      section: { marginBottom: '28px' },
      sectionTitle: { fontSize: '14px', fontWeight: 600, margin: '0 0 12px' },
      hint: { fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: '12px', background: 'var(--dsw-alias-bg-layer-2)', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px', whiteSpace: 'pre-wrap' },
      text: { fontSize: '13px', lineHeight: 1.6, opacity: 0.85, margin: '0 0 12px' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' },
      card: { border: '1px solid var(--dsw-alias-border-l1)', borderRadius: '12px', padding: '14px', background: 'var(--dsw-alias-bg-layer-1)' },
      info: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' },
      name: { fontSize: '14px', fontWeight: 600 },
      purpose: { fontSize: '12px', opacity: 0.7 },
      button: { width: '100%', padding: '8px 12px', fontSize: '13px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'var(--dsw-alias-brand-primary)', color: '#fff' },
      copied: { color: '#4ade80', fontSize: '12px', marginLeft: '8px' }
    }

    function ThemeCard({ theme }) {
      const [copied, setCopied] = React.useState(false)

      function copyExample() {
        const text = `remotion_plan {\n  name: "My Plugin",\n  brief: "A short description of what it does.",\n  theme: "${theme.id}",\n  durationSeconds: 24\n}`
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }).catch(() => {})
      }

      return h('div', { style: STYLES.card },
        h('div', { style: STYLES.info },
          h('div', { style: STYLES.name }, theme.name),
          h('div', { style: STYLES.purpose }, theme.purpose)
        ),
        h('button', { style: STYLES.button, onClick: copyExample },
          copied ? h(React.Fragment, null, 'Copied!', h('span', { style: STYLES.copied }, ' ✓')) : 'Copy example'
        )
      )
    }

    function RemotionStudioPanel() {
      return h('div', { style: STYLES.panel },
        h('div', { style: STYLES.header },
          h('h2', { style: STYLES.title }, 'Remotion Studio'),
          h('p', { style: STYLES.subtitle }, 'Agent-first Remotion video studio for DeepSeek Harness.')
        ),
        h('div', { style: STYLES.section },
          h('h3', { style: STYLES.sectionTitle }, 'Quick Start'),
          h('p', { style: STYLES.text }, 'Ask the assistant to render a video, or copy a theme example and run it as a tool call in chat.'),
          h('div', { style: STYLES.hint }, 'remotion_themes'),
          h('p', { style: STYLES.text }, 'Available tools: remotion_themes, remotion_scan, remotion_plan, remotion_render, remotion_edit')
        ),
        h('div', { style: STYLES.section },
          h('h3', { style: STYLES.sectionTitle }, 'Themes'),
          h('div', { style: STYLES.grid },
            THEMES.map(theme => h(ThemeCard, { key: theme.id, theme }))
          )
        ),
        h('div', { style: STYLES.section },
          h('h3', { style: STYLES.sectionTitle }, 'Example Workflow'),
          h('div', { style: STYLES.hint }, `remotion_plan {
  name: "My Plugin",
  brief: "A sidebar upgrade for DeepSeek Harness.",
  proof: "500+ downloads in the first week."
}`),
          h('div', { style: STYLES.hint }, `remotion_render {
  caseFile: "<path-to-case-json>",
  mode: "both"
}`)
        )
      )
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('sidebar.panellist', function () {
          return ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: PANEL_ID,
              order: PANEL_ORDER,
              label: 'Remotion Studio'
            },
            function (owner) {
              const active = !!(owner && owner.active)
              const size = (owner && owner.size) || 16
              return h('span', {
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: active ? 'var(--dsw-alias-brand-primary)' : 'inherit'
                }
              }, h(FilmGlyph, { size: size }))
            }
          )
        })

        ctx.slots.inject('main', function () {
          return ctx.slots.register(
            { name: 'main', key: PANEL_ID },
            function () {
              return h(RemotionStudioPanel)
            }
          )
        })
      }
    }
  }
})
