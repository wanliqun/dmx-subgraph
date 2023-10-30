import { Buy } from '../generated/templates/Launchpad/Launchpad'
import { Purchase } from '../generated/schema'
import { BigDecimal, Bytes, log } from '@graphprotocol/graph-ts'

export function handleBuy(e: Buy): void {
  let id = e.transaction.hash.
    concat(Bytes.fromUTF8("#")).
    concatI32(e.logIndex.toU32()).toString()
  let purchase = new Purchase(id.toString())
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