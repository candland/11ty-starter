import { Application } from '@hotwired/stimulus'
import MobileNavController from './controllers/mobile_nav_controller.js'

const application = Application.start()
application.register('mobile-nav', MobileNavController)
