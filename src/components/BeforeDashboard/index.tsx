import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your Skateland West Dashboard!</h4>
      </Banner>

      <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        Hi there! I&apos;m <strong>Buford Eeds</strong>, and I built this website for you.
        This admin panel is where you can manage all your website content - from pages
        and blog posts to images and more.
      </p>

      <h3>Quick Start Guide</h3>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Pages:</strong> Edit your website pages (Schedule, Birthday Parties, etc.)
          by clicking &quot;Pages&quot; in the sidebar. Click on any page to edit its content.
        </li>
        <li>
          <strong>Posts:</strong> Create blog posts or news updates. Great for announcing
          special events or promotions!
        </li>
        <li>
          <strong>Media:</strong> Upload and manage all your images. These can be used
          throughout your pages and posts.
        </li>
        <li>
          <strong>Header &amp; Footer:</strong> Under &quot;Globals&quot;, you can update
          your navigation links and footer content.
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

      <div style={{
        background: 'var(--theme-elevation-100)',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '2rem',
        border: '1px solid var(--theme-elevation-200)'
      }}>
        <h3 style={{ marginTop: 0 }}>Need Help or Want New Features?</h3>
        <p>
          If you have any questions, need support, or want to add new features to your website,
          don&apos;t hesitate to reach out!
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Contact:</strong> Buford Eeds
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Email:</strong>{' '}
            <a href="mailto:bufordeeds8@gmail.com">bufordeeds8@gmail.com</a>
          </li>
          <li>
            <strong>Phone:</strong>{' '}
            <a href="tel:2103253989">(210) 325-3989</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BeforeDashboard
