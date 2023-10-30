import { Buy } from '../generated/templates/Launchpad/Launchpad'
import { Purchase, Launchpad } from '../generated/schema'
import { BigDecimal, Bytes, log } from '@graphprotocol/graph-ts'

export function handleBuy(e: Buy): void {
  const launchpad = Launchpad.load(e.address.toHexString())
  if (!launchpad) {
    log.warning("Launchpad not found for new Buy event: launchpad - {}, txnHash - {}", [
      e.address.toHexString(), e.transaction.hash.toHexString(),
    ])
    return
  }

  let id = e.transaction.hash.concatI32(e.logIndex.toU32()).toHexString()
  let purchase = new Purchase(id)
  purchase.launchpad = launchpad.id
  purchase.buyer = e.params.buyer
  purchase.pairID = e.params.id
  purchase.amount = new BigDecimal(e.params.amountIn)
  purchase.txnHash = e.transaction.hash
  purchase.blockHash = e.block.hash
  purchase.blockNumber = e.block.number
  purchase.blockTimestamp = e.block.timestamp
  
  log.info("New buy event for launchpad: {}", [id])
  purchase.save()
}