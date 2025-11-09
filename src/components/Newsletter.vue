<template>
  <div class="newsletter-signup">
    <div 
      class="border border-primary-200 rounded-lg p-4 bg-primary-50/30"
      :class="{ 'opacity-75': isSubmitting }"
    >
      <!-- Success State -->
      <div v-if="isSuccess" class="text-center">
        <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-base font-semibold text-gray-800 mb-1">{{ successMessage }}</h3>
        <p class="text-sm text-gray-600">Check your email to confirm your subscription.</p>
      </div>

      <!-- Signup Form -->
      <div v-else>
        <div class="flex items-start gap-2 mb-3">
          <div class="w-7 h-7 bg-primary-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-base font-semibold text-gray-800 mb-0.5">{{ title }}</h3>
            <p class="text-sm text-gray-600">{{ description }}</p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-2">
          <div class="flex gap-2">
            <div class="flex-1">
              <input
                id="newsletter-email"
                v-model="formData.email"
                type="email"
                required
                placeholder="Email address"
                class="w-full px-3 py-2 border border-primary-200 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-400 outline-none text-sm transition-colors"
                :disabled="isSubmitting"
              />
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span v-else>{{ buttonText }}</span>
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-2 bg-red-50 border border-red-200 rounded">
            <p class="text-red-600 text-xs">{{ errorMessage }}</p>
          </div>

          <p class="text-xs text-gray-600 text-center leading-relaxed">
            Just for fun, low traffic, no sales pitches. I'll never sell your email. 
            Read the <a href="/privacy" class="text-primary-600 hover:text-primary-700 hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Props {
  title?: string
  description?: string
  buttonText?: string
  successMessage?: string
  privacyText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Subscribe to the Newsletter',
  description: 'Get the latest articles and insights delivered straight to your inbox. No spam, unsubscribe anytime.',
  buttonText: 'Subscribe',
  successMessage: 'Thank you for subscribing!',
  privacyText: 'We respect your privacy. Read our'
})

const formData = reactive({
  email: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Buttondown API endpoint
    // Note: This requires BUTTONDOWN_API_KEY to be set
    // For now, we'll use the embedded form approach which doesn't require API key
    
    // Use Buttondown's form submission endpoint
    const formElement = document.createElement('form')
    formElement.action = 'https://buttondown.email/api/emails/embed-subscribe/joeltankam'
    formElement.method = 'post'
    formElement.target = '_blank'
    
    const emailInput = document.createElement('input')
    emailInput.type = 'email'
    emailInput.name = 'email'
    emailInput.value = formData.email
    formElement.appendChild(emailInput)
    
    // Submit the form
    document.body.appendChild(formElement)
    formElement.submit()
    document.body.removeChild(formElement)

    // Success
    isSuccess.value = true
    formData.email = ''
    
    // Track conversion (if analytics is set up)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'newsletter_signup', {
        method: 'buttondown'
      })
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Something went wrong. Please try again later.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Subtle fade-in */
.newsletter-signup {
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>

