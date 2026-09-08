import type { Ref } from 'react'
import { SectionContainer } from '../common/SectionContainer'
import { SectionHeading } from '../common/SectionHeading'
import { SocialLinks } from '../common/SocialLinks'
import { ContactForm } from './ContactForm'
import styles from './Contact.module.css'

interface ContactProps {
  sectionRef?: Ref<HTMLElement>
}

export function Contact({ sectionRef }: ContactProps) {
  return (
    <SectionContainer id="contact" sectionRef={sectionRef}>
      <SectionHeading
        eyebrow="06 — Contact"
        title="Let's Build Something"
        subtitle="Have a project, an opportunity, or just want to talk tech? My inbox is open."
      />
      <div className={styles.layout}>
        <div className={styles.socialsColumn}>
          <h3 className={styles.socialsHeading}>Reach me directly</h3>
          <SocialLinks variant="buttons" />
        </div>
        <ContactForm />
      </div>
    </SectionContainer>
  )
}
