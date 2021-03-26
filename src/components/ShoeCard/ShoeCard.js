import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';
import UnstyledButton from '../UnstyledButton';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt='' src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
        {variant === 'on-sale' && <Tag variant={variant}>Sale</Tag>}
        {variant === 'new-release' && (
          <Tag variant={variant}>Just Released!</Tag>
        )}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 344px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const Tag = styled(UnstyledButton)`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 7px 9px;
  background-color: ${(p) =>
    p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
  font-size: ${14 / 16 + 'rem'};
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.white};
  border-radius: 2px;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(p) =>
    p.variant === 'on-sale' ? 'line-through' : 'none'};
  font-weight: ${(p) => (p.variant === 'on-sale' ? WEIGHTS.normal : 'inherit')};
  color: ${(p) => (p.variant === 'on-sale' ? COLORS.gray[700] : 'inherit')};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
