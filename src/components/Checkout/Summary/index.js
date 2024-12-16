import React, { useState } from "react";
import {
  AddIcon,
  Container,
  CouponButton,
  CouponContainer,
  CouponIcon,
  CouponInput,
  CouponLabel,
  Delete,
  DescriptionContainer,
  ErrorMessage,
  ItemDetails,
  ItemImage,
  ItemName,
  ItemPrice,
  ItemsContainer,
  ItemVariaton,
  Loading,
  LoadingContainer,
  PriceTotal,
  QuantityAdd,
  QuantityContainer,
  QuantityInput,
  QuantityRemove,
  RemoveIcon,
  Title,
  TotalContainer,
} from "./Summary.style";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCheckoutData } from "../../../redux/summarySlice";
import { formatPrice } from "../../../utils/formatPrice";

function Summary() {
  const queryParams = new URLSearchParams(window.location.search);
  const cartId = queryParams.get("cartId");

  const dispatch = useDispatch();
  const [data, setData] = useState();

  const getCartData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/cart/${cartId}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((results) => {
        setData(results.data);
        if (results.data.resumo.discountCode) {
          getCoupon(results.data.resumo.discountCode);
        }
        dispatch(setCheckoutData(results.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (cartId) {
    if (!data) {
      getCartData();
    }
  } else {
    window.location.href = "https://www.sterilybrasil.com/";
  }

  const hasDeliveryTax = data?.resumo?.total < 10000;
  const deliveryTax = 18;

  const [isLoading, setIsLoading] = useState(false);
  const [changedItem, setChangedItem] = useState();

  const handleItemQuantity = async (itemId, quantity, action) => {
    if (itemId) {
      setIsLoading(true);
      setChangedItem(itemId);
      await axios.put(
        `${process.env.REACT_APP_API_URL}/cart/${cartId}/item/${itemId}`,
        {
          quantity:
            action === "delete"
              ? 0
              : action === "increase"
              ? quantity + 1
              : quantity - 1,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      getCartData();
      setIsLoading(false);
      setChangedItem(undefined);
    }
  };

  const [couponData, setCouponData] = useState();
  const [couponError, setCouponError] = useState();
  const getCoupon = async (coupon = false) => {
    if (coupon || couponText) {
      coupon && setCouponText(coupon);
      await axios
        .get(`${process.env.REACT_APP_API_URL}/cupom`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        })
        .then((results) => {
          const couponData = results.data.find((item) => {
            return item.codigo === couponText || coupon;
          });
          if (couponData && couponData.ativo) {
            setCouponError(false);
            setCouponData(couponData);
            axios
              .put(
                `${process.env.REACT_APP_API_URL}/cart/${cartId}/apply-coupon`,
                {
                  coupon: couponText || coupon,
                },
                {
                  headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                  },
                }
              )
              .catch((err) => {
                console.log(err);
              });
          } else {
            setCouponError(true);
          }
        });
    } else {
      setCouponError(true);
    }
  };

  const [couponText, setCouponText] = useState();
  const handleDiscount = () => {
    return couponData.tipo_desconto === "porcentagem"
      ? (data?.resumo?.total -
          (data?.resumo?.total * parseInt(couponData.valor_desconto)) / 100) /
          100
      : couponData.valor_desconto;
  };
  return (
    <Container>
      <Title>Resumo</Title>
      <div class="group">
        <CouponLabel>
          {couponData ? "Cupom aplicado" : "Tem um cupom?"}
        </CouponLabel>
        <CouponContainer>
          <CouponIcon />
          <CouponInput
            type="text"
            name="code"
            id="promocode"
            placeholder="Código do cupom"
            value={couponText}
            required
            disabled={couponData}
            onChange={(e) => {
              setCouponText(e.target.value);
            }}
          />
          {!couponData && (
            <CouponButton
              onClick={() => {
                getCoupon();
              }}
            >
              Adicionar
            </CouponButton>
          )}
        </CouponContainer>
        {couponError && <ErrorMessage>Cupom inválido</ErrorMessage>}
        <PriceTotal>
          <DescriptionContainer>
            <p>Produtos</p>
            <p>{data && formatPrice(data?.resumo?.total)}</p>
          </DescriptionContainer>
          {couponData && (
            <DescriptionContainer>
              <p>Cupom</p>
              <p>{couponData && `- ${formatPrice(handleDiscount() * 100)}`}</p>
            </DescriptionContainer>
          )}
          <DescriptionContainer>
            <p>Frete</p>
            <p>
              {data && !hasDeliveryTax
                ? "Grátis"
                : `+ ${formatPrice(deliveryTax)}`}
            </p>
          </DescriptionContainer>
          <TotalContainer>
            <p>Total</p>
            <p>
              {data &&
                formatPrice(
                  hasDeliveryTax
                    ? data?.resumo?.total + deliveryTax
                    : !couponData
                    ? data?.resumo?.total
                    : data?.resumo?.total - handleDiscount() * 100
                )}
            </p>
          </TotalContainer>
        </PriceTotal>
      </div>
      {data &&
        data?.dados?.items?.map((item, index) => {
          if (item.quantity > 0)
            return (
              <ItemsContainer key={item.key} isFirstItem={index === 0}>
                <ItemImage
                  src={item.featured_image.url}
                  alt={item.featured_image.alt}
                />
                <ItemDetails>
                  <ItemName>{item.title}</ItemName>
                  {item.variation_title && (
                    <ItemVariaton>{item.variation_title}</ItemVariaton>
                  )}
                  <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                  <QuantityContainer>
                    <QuantityRemove
                      onClick={() => {
                        handleItemQuantity(item.id, item.quantity, "decrease");
                      }}
                    >
                      <RemoveIcon />
                    </QuantityRemove>
                    <QuantityInput value={item.quantity}></QuantityInput>
                    <QuantityAdd
                      onClick={() => {
                        handleItemQuantity(item.id, item.quantity, "increase");
                      }}
                    >
                      <AddIcon />
                    </QuantityAdd>
                    {isLoading && changedItem === item.id && (
                      <LoadingContainer>
                        <Loading color="inherit" />
                      </LoadingContainer>
                    )}
                  </QuantityContainer>
                </ItemDetails>
                <Tooltip title="Excluir" placement="top" arrow>
                  <Delete
                    onClick={() => {
                      handleItemQuantity(item.id, item.quantity, "delete");
                    }}
                  />
                </Tooltip>
              </ItemsContainer>
            );
          return null;
        })}
    </Container>
  );
}

export default Summary;
