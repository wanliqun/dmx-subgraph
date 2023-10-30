import { Launchpad } from '../generated/templates'
import { Bootstrap, Launchpad as LaunchpadModel } from '../generated/schema'
import { Registered } from '../generated/Registry/Registry'
import { Address, BigDecimal, Bytes, ethereum, log } from '@graphprotocol/graph-ts'

// Launchpad whitelist for data source templates:
// Fixed price launchpad: 0xbc96ff22f1c501aa57451d86d28c552975039251
// Batch auction: 0xe91e74f9ba267ce75b823a1032d355dc101fad33
const whiteListLaunchpads: string[][] = [
    ['0xbc96ff22f1c501aa57451d86d28c552975039251', "FixedPrice"],
    ['0xe91e74f9ba267ce75b823a1032d355dc101fad33', "BatchAuction"],
]

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

export function handleBlock(b: ethereum.Block): void {
  if (Bootstrap.load('0x0')) return

  log.info("Initializing launchpad data source templates", [])
  for (let i = 0; i < whiteListLaunchpads.length; i++) {
    const launchpad = whiteListLaunchpads[i]
    const addr = Address.fromString(launchpad[0])
    //const addr = Address.fromBytes(Bytes.fromHexString(launchpad[0]))

    const mLaunchpad = new LaunchpadModel(launchpad[0])
    mLaunchpad.idoType = launchpad[1]
    mLaunchpad.save()

    log.info("Creating new launchpad data source: {}", [launchpad[0]])
    Launchpad.create(addr)
  }

  let boot = new Bootstrap('0x0')
  boot.save()
}

function getIdoType(idoType: number): string {
    if (idoType == 1) return "FixedPrice"
    else if(idoType == 2) return "BatchAuction"
    else return "Unknown"
}