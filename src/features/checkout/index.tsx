'use client';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AppContext } from '@src/context/AppContext';
import { calculateItemsTotal, formatPrice, getSubstring } from '@src/helpers';
import React, { useContext, useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

export const Checkout = () => {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);


  const [emailData, setEmailData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });



  const sendEmail = () => {
    const templateParams = {
      address: emailData.address,
      phone: emailData.phone,
      subTotal: subTotal,
      tax: tax,
      checkout: checkout,
    };

    emailjs.send(
      "service_hfqt3ci",
      "template_pgsobwl",
      templateParams,
      "Ydr8t3CA-ZcSNs_Tg"
    )
    .then((result) => {
      console.log(result.text);
    }

    )
    .catch((error) => {
      console.log(error.text);
    });

  }




      





    const {
      state: { checkout },
    } = useContext(AppContext);

    useEffect(() => {
      const subTotal = calculateItemsTotal(checkout);
      const tax = 0.1 * subTotal;
      setSubTotal(subTotal);
      setTax(tax);
    }, [checkout]);
    return (
      <Flex
        w={{ base: '100%', lg: '90%' }}
        mx="auto"
        flexDir={{ base: 'column', lg: 'row' }}
        gap="2rem"
      >
        <Stack spacing={10} w={{ base: '100%', lg: '60%' }}>
          <Card borderWidth="1px" borderColor="gray.200" shadow="none">
            <CardHeader>
              <Heading size="md">Review Items</Heading>
            </CardHeader>

            <CardBody>
              <Stack spacing="2rem">
                {checkout.map((item) => (
                  <Flex key={item.id} align="center" justify="space-between">
                    <Flex align="center">
                      <Image
                        src={item.mainImage}
                        boxSize="100px"
                        bgSize="contain" />
                      <Box mx="1rem">
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: 'sm', lg: 'lg' }}
                          maxW="500px"
                        >
                          {item.name}
                        </Text>
                        <Text color="gray.500">
                          {getSubstring(item.description, 50)}
                        </Text>
                      </Box>
                    </Flex>
                    <Box textAlign="right">
                      <Text fontWeight="bold" fontSize={{ base: 'md', lg: 'lg' }}>
                        DT{formatPrice(item.price)}
                      </Text>
                      <Text fontSize={{ base: 'sm', lg: 'md' }}>
                        Quantity: {item.count}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Stack>
            </CardBody>
          </Card>

          <Card borderWidth="1px" borderColor="gray.200" shadow="none">
            <CardHeader>
              <Heading size="md">Delivery Information</Heading>
            </CardHeader>

            <CardBody>
              <Stack spacing="2rem">
                <Box>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" placeholder="Full name" />
                </Box>

                <Box>
                  <FormLabel>Address</FormLabel>
                  <Input type="text" placeholder="address" />
                </Box>

                <Box>
                  <FormLabel>Phone</FormLabel>
                  <Input type="text" placeholder="phone number" />
                </Box>

                <Box>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="email" />
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        <Box w={{ base: '100%', lg: '40%' }}>
          <Card borderWidth="1px" borderColor="gray.200" shadow="none" p="2rem">
            <CardHeader>
              <Heading size="md">Payment Details</Heading>
            </CardHeader>

            <CardBody>
              <Stack spacing="2rem">
                <Flex>
                  <Input
                    type="text"
                    placeholder="Enter Coupon Code"
                    rounded="full" />
                  <Button
                    bgColor="brand.primary"
                    color="white"
                    rounded="full"
                    ml="-40px"
                    px="2rem"
                    _hover={{
                      bgColor: 'brand.primaryDark',
                    }}
                    _active={{
                      bgColor: 'brand.primaryDark',
                    }}
                  >
                    Apply Coupon
                  </Button>
                </Flex>
                <Divider mt="1rem" />

                <Box>
                  <Heading size="xs" my="1rem">
                    Payment Option
                  </Heading>
                  <RadioGroup>
                    <Stack>
                      <Radio value="cashOnDelivery">Cash On Delivery</Radio>
                      <Radio value="momo">Mobile Money Payment</Radio>
                      <Radio value="3">Credit Card (Master/Visa)</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </Stack>
              <Divider mt="1rem" />

              <Box>
                <Flex justify="space-between" align="center" my="1rem">
                  <Text fontWeight="bold">Sub Total</Text>
                  <Text fontWeight="bold">DT{formatPrice(subTotal)}</Text>
                </Flex>

                <Flex justify="space-between" align="center" my="1rem">
                  <Text fontWeight="bold">Tax(10%)</Text>
                  <Text fontWeight="bold">DT{formatPrice(tax)}</Text>
                </Flex>

                <Flex justify="space-between" align="center" my="1rem">
                  <Text fontWeight="bold">Coupon Discount</Text>
                  <Text fontWeight="bold">-DT{formatPrice(tax)}</Text>
                </Flex>

                <Flex justify="space-between" align="center" my="1rem">
                  <Text fontWeight="bold">Shipping Cost</Text>
                  <Text fontWeight="bold">-DT{formatPrice(0)}</Text>
                </Flex>
                <Divider />
                <Flex justify="space-between" align="center" my="1rem">
                  <Text fontWeight="bold">Total</Text>
                  <Text fontWeight="bold">DT{formatPrice(subTotal)}</Text>
                </Flex>
              </Box>

              <Button
                bgColor="brand.primary"
                color="white"
                w="100%"
                rounded="full"
                _hover={{
                  bgColor: 'brand.primaryDark',
                }}
                _active={{
                  bgColor: 'brand.primaryDark',
                }}
                onClick={sendEmail}
              >
                Pay DT{formatPrice(subTotal)}
              </Button>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    );
  }
