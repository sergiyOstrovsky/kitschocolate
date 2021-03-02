import * as R from 'ramda';
import * as Yup from 'yup';
import Select from 'react-select';
import Toggle from 'react-toggle';
import AsyncSelect from 'react-select/async';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// forms
import { renderBorderColor } from './helpers';
// helpers
import { setDebounce, isNilOrEmpty, isNotNilAndNotEmpty } from '../../helpers';
// theme
import Theme from '../../theme';
// ui
import {
  Img,
  Box,
  Flex,
  Text,
  Button,
  Section,
  Article,
  ArticleTitle,
  SectionTitle
} from '../../ui';
// forms
import { Label, Input, Error, TextArea, InputWrapper } from './ui';
// //////////////////////////////////////////////////

const OrderComposition = () => (
  <Section>
    <SectionTitle {...Theme.styles.formSectionTitle}>
      Склад замовлення
    </SectionTitle>
    <Flex
      py={15}
      alignItems="center"
      borderBottom="1px solid"
      borderColor={Theme.colors.lightGrey}
    >
      <Img
        height={70}
        src="https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2Fhome%2Frecurring_orders%2F2.png?alt=media&token=d2a4a7f5-683b-405b-8f7f-57e5e6196be4"
      />
      <Article ml={15} height="max-content">
        <ArticleTitle
          fontSize={14}
          fontWeight="bold"
          color={Theme.colors.congoBrown}
        >
          Молочний шоколад з кокосом
        </ArticleTitle>
        <Text mt={10} fontWeight={500}>78 грн</Text>
      </Article>
    </Flex>
    <Flex
      py={15}
      alignItems="center"
      borderBottom="1px solid"
      borderColor={Theme.colors.lightGrey}
    >
      <Img
        height={70}
        src="https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2Fhome%2Frecurring_orders%2F1.png?alt=media&token=e14f1b3b-9aa0-4fab-b551-80b35d2b933d"
      />
      <Article ml={15} height="max-content">
        <ArticleTitle
          fontSize={14}
          fontWeight="bold"
          color={Theme.colors.congoBrown}
        >
          Молочний шоколад з кокосом
        </ArticleTitle>
        <Text mt={10} fontWeight={500}>
          78 грн
        </Text>
      </Article>
    </Flex>
    <Flex
      py={15}
      alignItems="center"
      borderBottom="1px solid"
      borderColor={Theme.colors.lightGrey}
    >
      <Img
        height={70}
        src="https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2Fhome%2Frecurring_orders%2F4.png?alt=media&token=a957ad50-51b4-43b0-a9ed-4f0fd1eb41ac"
      />
      <Article ml={15} height="max-content">
        <ArticleTitle
          fontSize={14}
          fontWeight="bold"
          color={Theme.colors.congoBrown}
        >
          Молочний шоколад з кокосом
        </ArticleTitle>
        <Text mt={10} fontWeight={500}>
          78 грн
        </Text>
      </Article>
    </Flex>
  </Section>
);

const RadioField = ({ form, field, ...props }) => (
  <Input {...form} {...field} {...props} type="radio" display="none" />
);

const TextField = ({ form, field, ...props }) => (
  <Input {...form} {...field} {...props} />
);

const TextAreaField = ({ form, field, ...props }) => (
  <TextArea {...form} {...field} {...props} />
);

const ToggleField = ({ field }) => (
  <Toggle
    {...R.dissoc('value', field)}
    icons={false}
    id={field.name}
    checked={field.value}
  />
);

const getCityOptions = (inputValue, callback) => {
  if (isNilOrEmpty(inputValue)) return;
  const options = {
    modelName: 'Address',
    calledMethod: 'getCities',
    apiKey: '5f9d3f032e76729f83f5fa983bcbc032',
    methodProperties: {
      FindByString: inputValue
    }
  };
  const url = 'https://api.novaposhta.ua/v2.0/json/Address/getCities';
  fetch(url, { method: 'POST', body: JSON.stringify(options) })
    .then(res => res.json())
    .then(({ data }) => {
      const cities = R.map(
        ({ Ref, Description }) => ({ value: Ref, label: Description }),
        data
      );
      callback(cities);
    });
};

const SearchCityField = ({ form, field }) => {
  const {
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
    setFieldTouched
  } = form;

  const fieldName = field.name;
  const borderColor = renderBorderColor({ errors, touched, id: fieldName });
  const selectStyles = {
    control: styles => ({
      ...styles,
      borderColor,
      fontSize: 12,
      borderRadius: 'none'
    })
  };
  const handleOnInputChange = (value, { action }) => {
    if (R.equals(action, 'set-value')) {
      const newValues = R.merge(values, {
        warehouse: null,
        loadedWarehouse: false
      });
      setValues(newValues);
    }
  };
  const handleChange = value => {
    if (isNilOrEmpty(value)) {
      const newValues = R.merge(values, {
        warehouse: null,
        [fieldName]: null,
        loadedWarehouse: false
      });
      setValues(newValues);
    } else {
      setFieldValue(fieldName, value);
    }
  };

  return (
    <AsyncSelect
      isClearable
      cacheOptions
      name={fieldName}
      inputId={fieldName}
      styles={selectStyles}
      onChange={handleChange}
      onInputChange={handleOnInputChange}
      loadOptions={setDebounce(getCityOptions, 1000)}
      onBlur={() => setFieldTouched(fieldName, true)}
    />
  );
};

const getWarehouseOptions = (CityRef, callback) => {
  const options = {
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: { CityRef },
    apiKey: '5f9d3f032e76729f83f5fa983bcbc032'
  };
  const url =
    'https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses';
  fetch(url, { method: 'POST', body: JSON.stringify(options) })
    .then(res => res.json())
    .then(({ data }) => {
      const warehouses = R.map(
        ({ Description }) => ({ value: Description, label: Description }),
        data
      );
      callback(warehouses);
    });
};

const WarehouseField = ({ form, field }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = form;

  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const handleSetWarehouseOptions = options => {
    setWarehouseOptions(options);
    setFieldValue('loadedWarehouse', true);
  };

  const shippingCity = R.path(['shippingCity', 'value'], values);
  const disabled = isNilOrEmpty(shippingCity);
  const fieldName = field.name;
  const borderColor = renderBorderColor({ errors, touched, id: fieldName });
  const selectStyles = {
    control: styles => ({
      ...styles,
      borderColor,
      fontSize: 12,
      borderRadius: 'none'
    })
  };

  useEffect(() => {
    if (isNotNilAndNotEmpty(shippingCity)) {
      if (R.equals(values.loadedWarehouse, false)) {
        getWarehouseOptions(shippingCity, handleSetWarehouseOptions);
      }
    } else {
      setWarehouseOptions([]);
    }
  }, [shippingCity]);

  return (
    <Select
      isClearable
      name={fieldName}
      disabled={disabled}
      inputId={fieldName}
      styles={selectStyles}
      value={values.warehouse}
      options={warehouseOptions}
      onBlur={() => setFieldTouched(field.name, true)}
      onChange={value => setFieldValue(field.name, value)}
    />
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .nullable(true)
    .email('email'),
  lastName: Yup.string()
    .nullable(true)
    .required('Field is required'),
  warehouse: Yup.string()
    .nullable(true)
    .required('Field is required'),
  firstName: Yup.string()
    .nullable(true)
    .required('Field is required'),
  phoneNumber: Yup.string()
    .nullable(true)
    .required('Field is required'),
  shippingCity: Yup.string()
    .nullable(true)
    .required('Field is required')
});

const FieldComponent = ({ id, name, value, type = 'text' }) => {
  const fieldTypes = {
    text: <Field id={id} name={id} component={TextField} />,
    toggle: <Field id={id} name={id} component={ToggleField} />,
    textarea: <Field id={id} name={id} component={TextAreaField} />,
    warehouse: <Field id={id} name={id} component={WarehouseField} />,
    searchCity: <Field id={id} name={id} component={SearchCityField} />,
    radio: <Field id={id} name={name} value={value} component={RadioField} />
  };

  return fieldTypes[type];
};

const FieldGroup = ({ id, type, label }) => (
  <Box mt={15}>
    <Label htmlFor={id}>{label}</Label>
    <InputWrapper>
      <FieldComponent id={id} type={type} />
      <ErrorMessage name={id} component={Error} />
    </InputWrapper>
  </Box>
);

const PaymentTypes = ({ paymentType }) => (
  <Box mt={15}>
    <Text
      mb={10}
      fontWeight={600}
      fontFamily="Poppins, sans-serif"
      color={Theme.colors.lightSlateGrey}
    >
      Оберіть метод оплати
    </Text>
    <Flex alignItems="stretch" justifyContent="space-between">
      <FieldComponent
        value="cash"
        type="radio"
        id="paymentType1"
        name="paymentType"
      />
      <Label width="30%" htmlFor="paymentType1">
        <Box
          p={10}
          height="100%"
          borderRadius="8px"
          border="2px solid"
          transition="all .3s ease"
          boxShadow="rgb(0 0 0 / 8%) 0px 4px 8px"
          borderColor={
            R.equals(paymentType, 'cash')
              ? Theme.colors.green
              : Theme.colors.lightGrey
          }
        >
          <Article color={Theme.colors.mainBlack}>
            <ArticleTitle
              fontSize={14}
              fontWeight={600}
              fontFamily="Poppins, sans-serif"
            >
              Готівкою
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              Наложений платіж за допомогою Нової Пошти
            </Text>
            <Text
              mt="5px"
              fontSize={10}
              textAlign="justify"
              color={Theme.colors.mediumWood}
            >
              Опція оплати доступна на замовлення від 400 грн
            </Text>
          </Article>
        </Box>
      </Label>
      <FieldComponent
        value="card"
        type="radio"
        id="paymentType2"
        name="paymentType"
      />
      <Label width="30%" htmlFor="paymentType2">
        <Box
          p={10}
          height="100%"
          borderRadius="8px"
          border="2px solid"
          transition="all .3s ease"
          boxShadow="rgb(0 0 0 / 8%) 0px 4px 8px"
          borderColor={
            R.equals(paymentType, 'card')
              ? Theme.colors.green
              : Theme.colors.lightGrey
          }
        >
          <Article color={Theme.colors.mainBlack}>
            <ArticleTitle
              fontSize={14}
              fontWeight={600}
              fontFamily="Poppins, sans-serif"
            >
              Карткою (онлайн)
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              За підтримкою WayForPay
            </Text>
            <Flex mt={15} height={20} justifyContent="space-between">
              <Img src="./master-card.svg" width="21%" height="100%" />
              <Img src="./visa.svg" width="21%" height="100%" />
              <Img src="./apple-pay.svg" width="21%" height="100%" />
              <Img src="./google-pay.svg" width="21%" height="100%" />
            </Flex>
          </Article>
        </Box>
      </Label>
      <FieldComponent
        type="radio"
        value="another"
        id="paymentType3"
        name="paymentType"
      />
      <Label width="30%" htmlFor="paymentType3">
        <Box
          p={10}
          height="100%"
          borderRadius="8px"
          border="2px solid"
          transition="all .3s ease"
          boxShadow="rgb(0 0 0 / 8%) 0px 4px 8px"
          borderColor={
            R.equals(paymentType, 'another')
              ? Theme.colors.green
              : Theme.colors.lightGrey
          }
        >
          <Article color={Theme.colors.mainBlack}>
            <ArticleTitle
              fontSize={14}
              fontWeight={600}
              fontFamily="Poppins, sans-serif"
            >
              Інший
            </ArticleTitle>
            <Text mt="5px" fontSize={10} textAlign="justify">
              Номер карти приватбанку буде відправлен в СМС
            </Text>
          </Article>
        </Box>
      </Label>
    </Flex>
  </Box>
);

const OrderForm = () => {
  return (
    <Box>
      <Formik
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          alert('success');
        }}
        initialValues={{
          email: '',
          call: true,
          lastName: '',
          comments: '',
          warehouse: '',
          firstName: '',
          phoneNumber: '',
          shippingCity: '',
          paymentType: 'cash',
          loadedWarehouse: false
        }}
      >
        {({ values }) => (
          <Form>
            <Flex>
              <Box width="50%">
                <Section>
                  <SectionTitle {...Theme.styles.formSectionTitle}>
                    Контактна інформація
                  </SectionTitle>
                  <FieldGroup id="firstName" label="First Name" />
                  <FieldGroup id="lastName" label="Last Name" />
                  <FieldGroup id="phoneNumber" label="Phone Number" />
                  <FieldGroup id="email" label="Email" />
                  <Flex
                    mt={15}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Label htmlFor="call">
                      Прошу перетелефонувати мені для уточнення замовлення
                    </Label>
                    <FieldComponent id="call" type="toggle" />
                  </Flex>
                </Section>
                <Section mt={50}>
                  <SectionTitle {...Theme.styles.formSectionTitle}>
                    Доставка та оплата
                  </SectionTitle>
                  <FieldGroup
                    id="shippingCity"
                    type="searchCity"
                    label="Місто або населений пункт"
                  />
                  <FieldGroup
                    id="warehouse"
                    type="warehouse"
                    label="Номер відділення Новой Пошти"
                  />
                  <FieldGroup
                    id="comments"
                    type="textarea"
                    label="Коментар до замовлення"
                  />
                </Section>
                <PaymentTypes paymentType={values.paymentType} />
              </Box>
              <Box
                ml={30}
                pl={30}
                width="50%"
                borderLeft="1px solid"
                borderColor={Theme.colors.lightGrey}
              >
                <OrderComposition />
                <Section mt={50}>
                  <SectionTitle {...Theme.styles.formSectionTitle}>
                    Разом до сплати
                  </SectionTitle>
                  <Box
                    borderBottom="1px solid"
                    borderColor={Theme.colors.lightGrey}
                  >
                    <Flex
                      py={15}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text color={Theme.colors.lightSlateGrey}>
                        3 товарів на суму
                      </Text>
                      <Text fontWeight={500}>234 грн</Text>
                    </Flex>
                    <Flex
                      py={15}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text color={Theme.colors.lightSlateGrey}>
                        Вартість доставки
                      </Text>
                      <Text fontWeight={500}>50 грн</Text>
                    </Flex>
                  </Box>
                  <Flex
                    py={25}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color={Theme.colors.lightSlateGrey}>
                      Разом до сплати
                    </Text>
                    <Text
                      fontSize={18}
                      fontWeight="bold"
                      color={Theme.colors.mainBlack}
                    >
                      284 грн
                    </Text>
                  </Flex>
                  <Button
                    mx="auto"
                    width={250}
                    height={50}
                    type="submit"
                    fontSize={14}
                    fontWeight={500}
                    color={Theme.colors.white}
                    background={Theme.colors.mediumWood}
                  >
                    Підтвердити замовлення
                  </Button>
                </Section>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OrderForm;
