import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'
import { RefreshHomeButton } from './RefreshHomeButton'
import { Changelog } from './Changelog'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your Skateland West Dashboard!</h4>
      </Banner>

      <div
        style={{
          background: 'var(--theme-elevation-100)',
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid var(--theme-elevation-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: '1rem' }}>
            Website built by <strong>Buford Eeds</strong> &mdash;{' '}
            <a href="mailto:hello@buford.dev">hello@buford.dev</a>
            {' '}&middot;{' '}
            <a href="tel:2103253989">(210) 325-3989</a>
          </p>
        </div>
        <a
          href="https://calendar.app.google/qvUAdGKuThEce21g7"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'var(--theme-elevation-800)',
            color: 'var(--theme-elevation-0)',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
          }}
        >
          Book a Support Session &rarr;
        </a>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontSize: '1.1rem', margin: 0, flex: 1 }}>
          This admin panel is where you can manage all your website content.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <RefreshHomeButton />
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'var(--theme-success-500)',
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              whiteSpace: 'nowrap',
            }}
          >
            View Website &rarr;
          </a>
        </div>
      </div>

      <h3>Quick Start Guide</h3>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Pages:</strong> Edit your website pages (Schedule, Birthday Parties, etc.) by
          clicking &quot;Pages&quot; in the sidebar. Click on any page to edit its content.
        </li>
        <li>
          <strong>Posts:</strong> Create blog posts or news updates. Great for announcing special
          events or promotions!
        </li>
        <li>
          <strong>Media:</strong> Upload and manage all your images. These can be used throughout
          your pages and posts.
        </li>
        <li>
          <strong>Header &amp; Footer:</strong> Under &quot;Globals&quot;, you can update your
          navigation links and footer content.
        </li>
      </ul>

      <h3>How to Edit a Page</h3>
      <ol className={`${baseClass}__instructions`}>
        <li>Click &quot;Pages&quot; in the left sidebar</li>
        <li>Click on the page you want to edit</li>
        <li>Make your changes in the editor</li>
        <li>Click &quot;Save&quot; (or &quot;Publish changes&quot;) in the top right</li>
        <li>Your changes will be live on the website!</li>
      </ol>

      <Changelog />
    </div>
  )
}

export default BeforeDashboard
