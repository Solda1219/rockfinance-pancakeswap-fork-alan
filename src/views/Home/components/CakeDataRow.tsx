import React from 'react'
import styled from 'styled-components'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber, formatLocalisedCompactNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { Flex, Text, Heading, Skeleton } from '@rock-finance/uikit'
import Balance from 'components/Balance'

const StyledColumn = styled(Flex)<{ noMobileBorder?: boolean }>`
  flex-direction: column;
  ${({ noMobileBorder, theme }) =>
    noMobileBorder
      ? `${theme.mediaQueries.md} {
           padding: 0 16px;
           border-left: 1px ${theme.colors.inputSecondary} solid;
         }
       `
      : `border-left: 1px ${theme.colors.inputSecondary} solid;
         padding: 0 8px;
         ${theme.mediaQueries.sm} {
           padding: 0 16px;
         }
       `}
`

const Grid = styled.div`
  display: grid;
  grid-gap: 16px 8px;
  margin-top: 24px;
  grid-template-columns: repeat(2, auto);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 16px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 32px;
    grid-template-columns: repeat(4, auto);
  }
`

const emissionsPerBlock = 15

const CakeDataRow = () => {
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const cakePriceBusd = usePriceCakeBusd()
  const mcap = cakePriceBusd.times(cakeSupply)
  const mcapString = formatLocalisedCompactNumber(mcap.toNumber())

  return (
    <Grid>
      <Flex flexDirection="column">
        <Text color="textSubtle">{'Total supply'}</Text>
        {cakeSupply ? (
          <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={cakeSupply} />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </Flex>
      <StyledColumn>
        <Text color="textSubtle">{'Burned to date'}</Text>
        {burnedBalance ? (
          <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={burnedBalance} />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>
      <StyledColumn noMobileBorder>
        <Text color="textSubtle">{'Market cap'}</Text>
        {mcap?.gt(0) && mcapString ? (
          <Heading scale="lg">{`$${mcapString}`}</Heading>
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>
      <StyledColumn>
        <Text color="textSubtle">{'Current emissions'}</Text>

        <Heading scale="lg">{`${emissionsPerBlock}/block`}</Heading>
      </StyledColumn>
    </Grid>
  )
}

export default CakeDataRow
