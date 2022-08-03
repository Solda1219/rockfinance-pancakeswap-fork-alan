import BigNumber from 'bignumber.js'

export const getEarningsText = (
  numFarmsToCollect: number,
  hasCakePoolToCollect: boolean,
  earningsBusd: BigNumber
): string => {
  const data = {
    earningsBusd: earningsBusd.toString(),
    count: numFarmsToCollect,
  }

  let earningsText = `${data} to collect`

  if (numFarmsToCollect > 0 && hasCakePoolToCollect) {
    if (numFarmsToCollect > 1) {
      earningsText = `${data} to collect from %count% farms and CAKE pool`
    } else {
      earningsText = `${data} to collect from %count% farm and CAKE pool`
    }
  } else if (numFarmsToCollect > 0) {
    if (numFarmsToCollect > 1) {
      earningsText = `${data} to collect from %count% farms`
    } else {
      earningsText = `${earningsBusd} to collect from farm`
    }
  } else if (hasCakePoolToCollect) {
    earningsText = `${earningsBusd} to collect from CAKE pool`
  }

  return earningsText
}
