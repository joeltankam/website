<template>
  <div class="newsletter-signup">
    <div 
      class="border border-blue-200 rounded-lg p-4 bg-blue-50/30"
      :class="{ 'opacity-75': isSubmitting }"
    >
      <!-- Success State -->
      <div v-if="isSuccess" class="text-center">
        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-base font-semibold text-gray-800 mb-1">{{ successMessage }}</h3>
        <p class="text-sm text-gray-600">Check your email to confirm your subscription.</p>
      </div>

      <!-- Signup Form -->
      <div v-else>
        <div class="flex items-start gap-2 mb-3">
          <div class="w-7 h-7 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div v-if="collectName" class="flex-1">
              <input
                id="newsletter-name"
                v-model="formData.name"
                type="text"
                :required="collectName"
                placeholder="Name"
                class="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-400 outline-none text-sm transition-colors"
                :disabled="isSubmitting"
              />
            </div>
            
            <div class="flex-1">
              <input
                id="newsletter-email"
                v-model="formData.email"
                type="email"
                required
                placeholder="Email address"
                class="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-400 outline-none text-sm transition-colors"
                :disabled="isSubmitting"
              />
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
            Read the <a href="/privacy" class="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>.
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
  collectName?: boolean
  provider?: 'mailchimp' | 'convertkit' | 'custom'
  apiEndpoint?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Subscribe to the Newsletter',
  description: 'Get the latest articles and insights delivered straight to your inbox. No spam, unsubscribe anytime.',
  buttonText: 'Subscribe',
  successMessage: 'Thank you for subscribing!',
  privacyText: 'We respect your privacy. Read our',
  collectName: true,
  provider: 'custom',
  apiEndpoint: '/api/newsletter/subscribe'
})

const formData = reactive({
  name: '',
  email: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Custom API endpoint
    if (props.provider === 'custom') {
      const response = await fetch(props.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Subscription failed. Please try again.')
      }
    }
    
    // Mailchimp integration
    else if (props.provider === 'mailchimp') {
      // Implement Mailchimp API call here
      console.log('Mailchimp subscription:', formData)
    }
    
    // ConvertKit integration
    else if (props.provider === 'convertkit') {
      // Implement ConvertKit API call here
      console.log('ConvertKit subscription:', formData)
    }

    // Success
    isSuccess.value = true
    formData.name = ''
    formData.email = ''
    
    // Track conversion (if analytics is set up)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'newsletter_signup', {
        method: props.provider
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
