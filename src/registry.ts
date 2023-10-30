import { Launchpad } from '../generated/templates'
import { Bootstrap } from '../generated/schema'
import { Registered } from '../generated/Registry/Registry'
import { Address, BigDecimal, ethereum, log } from '@graphprotocol/graph-ts'

// Launchpad whitelist for data source templates:
// Fixed price launchpad: 0xbc96ff22f1c501aa57451d86d28c552975039251
// Batch auction: 0xe91e74f9ba267ce75b823a1032d355dc101fad33
const launchpadWhiteList: string[] = [
    '0xbc96ff22f1c501aa57451d86d28c552975039251',
    '0xe91e74f9ba267ce75b823a1032d355dc101fad33',
]

export function handleRegistered(r: Registered): void {
  // Start indexing the launchpad; `event.params.launchpad` is the
  // address of the new launchpad contract
  const addr = r.params.launchpad
  Launchpad.create(addr)
  log.info("New launchpad data source register: {}", [addr.toString()])
}

export function handleBlock(b: ethereum.Block): void {
  if (Bootstrap.load('0x0')) return

  log.info("Initializing launchpad data source templates", [])
  for (let i = 0; i < launchpadWhiteList.length; i++) {
    const hexAddr = launchpadWhiteList[i]
    const addr = Address.fromBytes(Address.fromHexString(hexAddr))

    Launchpad.create(addr)
    log.info("Launchpad data source template initialized: {}", [hexAddr])
  }

  let boot = new Bootstrap('0x0')
  boot.save()
}