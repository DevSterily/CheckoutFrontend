import React, { useEffect, useState, useCallback } from "react";
import {
  AddIcon,
  Container,
  CouponButton,
  CouponContainer,
  CouponIcon,
  CouponInput,
  CouponLabel,
  CouponDiscountText,
  RemoveCouponButton,
  CloseIcon,
  InfoIcon,
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
  ModalErrorButtonFilled,
  ModalErrorButtonOutline,
  ModalErrorDescription,
  ModalErrorTitle,
  PriceTotal,
  QuantityAdd,
  QuantityContainer,
  QuantityInput,
  QuantityRemove,
  RemoveIcon,
  Title,
  TotalContainer,
  PriceDisplay,
  CollapseButton,
  TitleText,
  SubtitleText,
} from "./Summary.style";
import { Box, Modal, Tooltip } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutData } from "../../../redux/summarySlice";
import { formatPrice } from "../../../utils/formatPrice";
import { useResponsive } from "../../../hooks/useResponsive";

let cupomAtual = "";

function Summary() {
  const { isMobile, isTablet } = useResponsive();
  const queryParams = new URLSearchParams(window.location.search);
  const cartId = queryParams.get("cartId");

  const dispatch = useDispatch();
  const { hasFinished: deliveryFinished } = useSelector(
    (state) => state.delivery
  );

  const [data, setData] = useState();
  console.log("🚀 ~ Summary ~ data:", data);
  const [couponText, setCouponText] = useState();

  const getCartData = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/cart/${cartId}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      })
      .then((results) => {
        setData(results.data);
        setDeliveryTax(results.data.resumo.shipping / 100);
        if (results.data.resumo.discountCode) {
          getCoupon(results.data.resumo.discountCode);
        }
        dispatch(setCheckoutData(results.data));
      })
      .catch((error) => {
        return;
      });
  }, [cartId, dispatch]);

  if (cartId) {
    if (!data) {
      getCartData();
    }
  } else {
    window.location.href = "https://www.sterilybrasil.com/";
  }

  const hasDeliveryTax = data?.resumo?.total <= 9800;
  // const deliveryTax = 18;

  const [deliveryTax, setDeliveryTax] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [changedItem, setChangedItem] = useState();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleModal = () => {
    setIsModalOpened(!isModalOpened);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const [lastItemData, setLastItemData] = useState();

  const handleItemQuantity = async (itemId, quantity, action) => {
    if (itemId) {
      if (
        !isModalOpened &&
        data?.resumo?.totalItems === 1 &&
        (action === "decrease" || action === "delete")
      ) {
        setLastItemData({ itemId, quantity, action });
        handleModal();
      } else {
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
    }
  };

  const [couponData, setCouponData] = useState();
  console.log("🚀 ~ Summary ~ couponData:", couponData);
  const [couponError, setCouponError] = useState();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const getCoupon = useCallback(
    async (coupon = false) => {
      console.log({
        cupomAtual,
        coupon,
        retornar: cupomAtual === coupon,
      });

      if (cupomAtual === coupon) {
        return;
      }

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
              return item.codigo === couponText?.toLowerCase() || coupon;
            });
            if (couponData?.ativo) {
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
                .then(() => {
                  if (cupomAtual !== coupon) {
                    getCartData();
                  }
                  cupomAtual = coupon;
                })
                .catch((err) => {
                  return;
                });
            } else {
              setCouponError(true);
            }
          });
      } else {
        setCouponError(true);
      }
    },
    [couponText, cartId, getCartData]
  );

  const handleDiscount = () => {
    return couponData.tipo_desconto === "porcentagem"
      ? (data?.resumo?.total -
          (data?.resumo?.total * Number.parseInt(couponData.valor_desconto)) /
            100) /
          100
      : couponData.valor_desconto;
  };

  const calculateDiscount = (data) => {
    return formatPrice(data?.resumo?.total - data?.resumo?.totalWithDiscount);
  };

  const { hasFinished: hasDeliveryFinished } = useSelector(
    (state) => state.delivery
  );

  useEffect(() => {
    if (hasDeliveryFinished) {
      getCartData();
    }
    // eslint-disable-next-line
  }, [hasDeliveryFinished, getCartData]);

  useEffect(() => {
    if (data?.resumo?.totalItems === 0) {
      window.location.href = "https://www.sterilybrasil.com/";
    }
  }, [data]);

  return (
    <Container isCollapsed={isCollapsed}>
      <Title isMobile={isMobile || isTablet}>
        <div className="title-content">
          <div>
            <TitleText hideOnMobile>RESUMO</TitleText>
            <TitleText>RESUMO ({data?.resumo?.totalItems || 0})</TitleText>
            <SubtitleText isCollapsed={isCollapsed}>
              Informações da sua compra
            </SubtitleText>
          </div>
          <div className="title-actions">
            <PriceDisplay>
              {data &&
                formatPrice(
                  data?.resumo?.totalWithDiscount || data?.resumo?.total
                )}
            </PriceDisplay>
            <CollapseButton onClick={toggleCollapse} isCollapsed={isCollapsed}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: !isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </CollapseButton>
          </div>
        </div>
      </Title>

      {!isCollapsed && (
        <div class="group">
          <CouponLabel>
            {couponData ? "Cupom aplicado" : "Tem um cupom?"}
          </CouponLabel>
          <CouponContainer cumpomApplied={couponData}>
            <CouponIcon />
            <CouponInput
              type="text"
              name="code"
              id="promocode"
              placeholder="Código do cupom"
              value={couponText}
              required
              // disabled={couponData}
              onChange={(e) => {
                setCouponText(e.target.value);
              }}
            />
            {/* {!couponData && ( */}
            <CouponButton
              onClick={() => {
                getCoupon();
              }}
            >
              Adicionar
            </CouponButton>
            {/* )} */}
          </CouponContainer>
          {couponData && !couponError && (
            <div>
              <CouponDiscountText>
                Desconto (- {""}
                {calculateDiscount(data)})
              </CouponDiscountText>
            </div>
          )}
          {couponError && <ErrorMessage>Cupom não encontrado</ErrorMessage>}
          {couponData && (
            <RemoveCouponButton
              onClick={() => {
                // Remover cupom
                axios
                  .put(
                    `${process.env.REACT_APP_API_URL}/cart/${cartId}/remove-coupon`,
                    {},
                    {
                      headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                      },
                    }
                  )
                  .then(() => {
                    setCouponData(null);
                    setCouponText("");
                    setCouponError(false);
                    cupomAtual = "";
                    getCartData();
                  });
              }}
            >
              <CloseIcon
                viewBox="0 0 9 9"
                fill="#725bc2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5311 0.691559L8.30828 7.46875L7.46859 8.30844L0.691406 1.53125L1.5311 0.691559Z"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.691411 7.46876L7.4686 0.691569L8.30829 1.53126L1.5311 8.30845L0.691411 7.46876Z"
                ></path>
              </CloseIcon>
              Remover
            </RemoveCouponButton>
          )}
          {data?.resumo?.totalItems > 0 && (
            <PriceTotal>
              <DescriptionContainer>
                <p>Produtos</p>
                <p>{data && formatPrice(data?.dados?.total_price)}</p>
              </DescriptionContainer>
              {couponData && (
                <DescriptionContainer>
                  <p>
                    Descontos
                    <Tooltip
                      title={`Cupom de desconto  ${calculateDiscount(data)}`}
                      placement="top"
                      arrow
                      disableHoverListener={false}
                      disableFocusListener={false}
                      disableTouchListener={false}
                      enterTouchDelay={0}
                      leaveTouchDelay={3000}
                    >
                      <InfoIcon>i</InfoIcon>
                    </Tooltip>
                  </p>
                  <p>
                    {/* {couponData && `- ${formatPrice(handleDiscount() * 100)}`} */}
                    {couponData && `- ${calculateDiscount(data)}`}
                  </p>
                </DescriptionContainer>
              )}
              {deliveryFinished && (
                <DescriptionContainer>
                  <p>Frete</p>
                  <p>
                    {data && !hasDeliveryTax
                      ? "Grátis"
                      : `+ ${formatPrice(deliveryTax * 100)}`}
                  </p>
                </DescriptionContainer>
              )}
              <TotalContainer>
                <p>Total</p>
                <p>
                  {data &&
                    formatPrice(
                      data?.resumo?.totalWithDiscount || data?.resumo?.total
                    )}
                </p>
              </TotalContainer>
            </PriceTotal>
          )}
        </div>
      )}

      {data &&
        !isCollapsed &&
        data?.dados?.items?.map((item, index) => {
          if (item.quantity > 0)
            return (
              <ItemsContainer key={item.key} isFirstItem={index === 0}>
                <ItemImage
                  src={item.featured_image.url}
                  alt={item.featured_image.alt}
                />
                <ItemDetails>
                  <ItemName>{item.product_title}</ItemName>
                  {item.variant_title && (
                    <ItemVariaton>Opções: {item.variant_title}</ItemVariaton>
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
                <Tooltip
                  title="Excluir"
                  placement="top"
                  arrow
                  disableHoverListener={false}
                  disableFocusListener={false}
                  disableTouchListener={false}
                  enterTouchDelay={0}
                  leaveTouchDelay={3000}
                >
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
      <Modal
        open={isModalOpened}
        onClose={() => {
          handleModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #e50f38",
            boxShadow: 24,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <ModalErrorTitle>Você tem certeza?</ModalErrorTitle>
          <ModalErrorDescription id="modal-modal-description" sx={{ mt: 2 }}>
            Esse é o último item do seu carrinho!
          </ModalErrorDescription>

          <ModalErrorButtonOutline
            onClick={() => {
              handleModal();
              handleItemQuantity(
                lastItemData.itemId,
                lastItemData.quantity,
                lastItemData.action
              );
            }}
          >
            APAGAR CARRINHO
          </ModalErrorButtonOutline>
          <ModalErrorButtonFilled
            onClick={() => {
              handleModal();
            }}
          >
            CANCELAR
          </ModalErrorButtonFilled>
        </Box>
      </Modal>
    </Container>
  );
}

export default Summary;
