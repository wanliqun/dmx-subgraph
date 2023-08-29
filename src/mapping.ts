
import { Buy } from '../generated/DEX/DEX'
import { Purchase } from '../generated/schema'
import { BigDecimal, crypto } from '@graphprotocol/graph-ts'


export function handleBuy(e: Buy): void {
  let id = crypto.keccak256(e.block.hash.concat(e.transaction.hash).concatI32(e.logIndex.toI32()))
  let purchase = new Purchase(id.toHexString())
  purchase.buyer = e.params.buyer
  purchase.pairID = e.params.id
  purchase.amount = new BigDecimal(e.params.amountIn)
  purchase.txnHash = e.transaction.hash
  purchase.createdAt = e.block.timestamp
  purchase.save()
}
