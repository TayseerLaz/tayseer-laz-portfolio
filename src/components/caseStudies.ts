import CaseStudy from './CaseStudy'
import HaderAI from './HaderAI'
import Lancaster from './Lancaster'
import SlaBridge from './SlaBridge'
import Bsheel from './Bsheel'
import IEvents from './IEvents'
import OmniSign from './OmniSign'

/** Case studies with their own bespoke component; every other slug renders through Project. */
export const featured = {
  wms: CaseStudy, hader: HaderAI, lancaster: Lancaster, sla: SlaBridge,
  bsheel: Bsheel, ievents: IEvents, omnisign: OmniSign,
}
