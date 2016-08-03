import ComponentManager from 'aem-with-react/ComponentManager'
import RootComponentRegistry from 'aem-with-react/RootComponentRegistry'
import componentRegistry from './componentRegistry'

const rootComponentRegistry = new RootComponentRegistry()

rootComponentRegistry.add(componentRegistry)
rootComponentRegistry.init()
const componentManager = new ComponentManager(rootComponentRegistry)

componentManager.initReactComponents()


if (typeof window === 'undefined') {
  throw 'this is not the browser'
}

window.AemGlobal = { componentManager }
