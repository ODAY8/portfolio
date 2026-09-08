import { useEffect, useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { EMAIL, FORMSPREE_ENDPOINT } from '../../data/content'
import { Button } from '../common/Button'
import styles from './Contact.module.css'

interface FormValues {
  name: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormValues, string>>

type ToastState = { kind: 'success' | 'error'; message: string } | null

const initialValues: FormValues = { name: '', email: '', message: '' }

/** Loose validation and a "just contains @" email check are both
 * intentional, ported as-is from the Flutter form -- not bugs to fix. */
function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name'
  if (!values.email.trim()) errors.email = 'Please enter your email'
  else if (!values.email.includes('@')) errors.email = 'Please enter a valid email'
  if (!values.message.trim()) errors.message = 'Please enter a message'
  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  useEffect(() => {
    if (!toast) return
    const duration = toast.kind === 'success' ? 4000 : 6000
    const id = setTimeout(() => setToast(null), duration)
    return () => clearTimeout(id)
  }, [toast])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (submitting) return

    const fieldErrors = validate(values)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) return

    setSubmitting(true)
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      })

      if (response.ok) {
        setValues(initialValues)
        setErrors({})
        setToast({ kind: 'success', message: 'Message sent — thanks for reaching out!' })
      } else {
        showFailure()
      }
    } catch {
      showFailure()
    } finally {
      setSubmitting(false)
    }
  }

  function showFailure() {
    setToast({
      kind: 'error',
      message: `Something went wrong sending your message. Please try again, or reach me directly at ${EMAIL}.`,
    })
  }

  return (
    <form className={styles.formColumn} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className={styles.input}
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name && (
          <span id="contact-name-error" className={styles.errorText}>
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          className={styles.input}
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email && (
          <span id="contact-email-error" className={styles.errorText}>
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <span id="contact-message-error" className={styles.errorText}>
            {errors.message}
          </span>
        )}
      </div>

      <div className={styles.submitRow}>
        <Button
          type="submit"
          variant="primary"
          icon={submitting ? undefined : <Send size={18} />}
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>

      {toast && (
        <div className={styles.toast} role="status">
          {toast.message}
        </div>
      )}
    </form>
  )
}
