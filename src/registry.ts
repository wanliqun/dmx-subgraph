import { Launchpad } from '../generated/templates'
import { Launchpad as LaunchpadModel } from '../generated/schema'
import { Registered } from '../generated/Registry/Registry'
import { Address, BigDecimal, Bytes, ethereum, log } from '@graphprotocol/graph-ts'

export function handleRegistered(r: Registered): void {
  // Start indexing the launchpad; `event.params.launchpad` is the
  // address of the new launchpad contract
  const addr = r.params.launchpad
  const mLaunchpad = new LaunchpadModel(addr.toHexString())
  mLaunchpad.idoType = getIdoType(r.params.idoType.toI32())
  mLaunchpad.save()

  log.info("Creating new launchpad data source: {}", [addr.toHexString()])
  Launchpad.create(addr)
}

function getIdoType(idoType: number): string {
    if (idoType == 1) return "FixedPrice"
    else if(idoType == 2) return "BatchAuction"
    else return "Unknown"
}