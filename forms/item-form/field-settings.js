import * as R from 'ramda';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// components
import ImageComponent from '../../components/image';
// helpers
import { showToastifyMessage } from '../../helpers';
// theme
import Theme from '../../theme';
// ui
import { Text, Span, Flex } from '../../ui';
// //////////////////////////////////////////////////

const ImageOption = props => (
  <Span m={10}>
    <ImageComponent
      {...props.innerProps}
      width={50}
      height={60}
      src={props.label}
    />
  </Span>
);

const ImageOptionWithTitle = props => (
  <Flex m={10} alignItems="center">
    <ImageComponent
      {...props.innerProps}
      width={50}
      height={60}
      src={props.data.label}
    />
    <Text ml="7px">{R.path(['data', 'title'], props)}</Text>
  </Flex>
);

const MultiValueLabel = ({ children }) => (
  <ImageComponent width={20} height={30} src={children} />
);

const SingleValue = ({ children }) => (
  <ImageComponent width={20} height={30} src={children} />
);

const SingleValueWithTitle = ({ data }) => (
  <Flex alignItems="center">
    <ImageComponent width={20} height={30} src={data.label} />
    <Text ml="7px" withEllipsis title={data.title} maxWidth={170}>
      {data.title}
    </Text>
  </Flex>
);

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Field is Required'),
  price: Yup.string().required('Field is Required'),
  quantity: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required')
});

export const validationKeys = {
  title: Yup.string().required('Field is Required'),
  price: Yup.string().required('Field is Required'),
  quantity: Yup.string().required('Field is Required'),
  description: Yup.string().required('Field is Required')
};

const setDisplay = (id, values, fieldType) => {
  const path = R.append('type', R.take(2, R.split('.', id)));

  const showDisplay = R.pathEq(path, fieldType, values);

  return showDisplay ? 'block' : 'none';
};

export const fieldsMap = {
  active: {
    id: 'active',
    type: 'toggle',
    label: 'Active'
  },
  title: {
    id: 'title',
    type: 'text',
    label: 'Title'
  },
  price: {
    id: 'price',
    type: 'number',
    label: 'Price'
  },
  quantity: {
    id: 'quantity',
    type: 'number',
    label: 'Quantity'
  },
  extraImages: {
    isMulti: true,
    label: 'Images',
    id: 'extraImages',
    type: 'reactSelect',
    options: 'chocolates',
    reactSelectComponents: {
      MultiValueLabel,
      Option: ImageOption
    }
  },
  imgUrl: {
    id: 'imgUrl',
    options: 'recipes',
    label: 'Item Image',
    type: 'reactSelect',
    reactSelectComponents: {
      SingleValue,
      Option: ImageOption
    }
  },
  ingredientIcons: {
    isMulti: true,
    type: 'reactSelect',
    id: 'ingredientIcons',
    options: 'ingredients',
    label: 'Ingredient Images',
    reactSelectComponents: {
      MultiValueLabel,
      Option: ImageOption
    }
  },
  description: {
    width: '100%',
    type: 'textarea',
    id: 'description',
    label: 'Description'
  },
  question: {
    id: 'question',
    type: 'textarea',
    label: 'Question',
    width: 'calc(50% - 100px)'
  },
  answer: {
    id: 'answer',
    label: 'Answer',
    type: 'textarea'
  },
  column: {
    id: 'column',
    label: 'Column',
    type: 'reactSelect',
    options: [{ value: 1, label: 1 }, { value: 2, label: 2 }]
  },
  cookingTime: {
    type: 'number',
    id: 'cookingTime',
    label: 'Cooking Time'
  },
  ingredients: {
    type: 'array',
    id: 'ingredients',
    title: 'Ingredients',
    arrayFields: [
      {
        id: 'type',
        label: 'Type',
        type: 'reactSelect',
        defaultValue: 'additional',
        wrapperStyles: { mr: 20, width: 250 },
        options: [
          { value: 'additional', label: 'Additional' },
          { value: 'chocolate', label: 'Chocolate' },
          { value: 'recipe', label: 'Recipe' }
        ]
      },
      {
        id: 'title',
        type: 'text',
        label: 'Title',
        wrapperStyles: {
          mr: 20,
          width: 300,
          setDisplay: (id, values) => setDisplay(id, values, 'additional')
        }
      },
      {
        id: 'id',
        label: 'Chocolate',
        type: 'reactSelect',
        isSearchable: false,
        options: 'chocolateOptions',
        reactSelectComponents: {
          Input: () => null,
          Option: ImageOptionWithTitle,
          SingleValue: SingleValueWithTitle
        },
        wrapperStyles: {
          mr: 20,
          width: 300,
          setDisplay: (id, values) => setDisplay(id, values, 'chocolate')
        }
      },
      {
        id: 'id',
        label: 'Recipe',
        type: 'reactSelect',
        isSearchable: false,
        options: 'recipeOptions',
        reactSelectComponents: {
          Input: () => null,
          Option: ImageOptionWithTitle,
          SingleValue: SingleValueWithTitle
        },
        wrapperStyles: {
          mr: 20,
          width: 300,
          setDisplay: (id, values) => setDisplay(id, values, 'recipe')
        }
      },
      {
        id: 'quantity',
        type: 'number',
        label: 'Quantity',
        wrapperStyles: { mr: 20, width: 250 }
      }
    ]
  },
  direction: {
    type: 'array',
    id: 'direction',
    title: 'Direction',
    arrayFields: [
      {
        type: 'textarea',
        label: 'Description',
        width: 'calc(100% - 40px)'
      }
    ]
  }
};

export const chocolateFields = [
  {
    key: 'active',
    wrapperStyles: {
      mr: 20,
      width: 100
    }
  },
  {
    key: 'title',
    wrapperStyles: {
      mr: 20,
      width: 250
    }
  },
  {
    key: 'price',
    wrapperStyles: {
      mr: 20,
      width: 250
    }
  },

  {
    key: 'quantity',
    wrapperStyles: {
      mr: 20,
      width: 250
    }
  },
  {
    key: 'extraImages',
    wrapperStyles: {
      width: 400
    }
  },
  {
    key: 'description',
    wrapperStyles: {
      width: '100%'
    }
  }
];

export const recipeFields = [
  {
    key: 'active',
    wrapperStyles: {
      mr: 20,
      width: 100
    }
  },
  {
    key: 'title',
    wrapperStyles: {
      mr: 20,
      width: 250
    }
  },
  {
    key: 'imgUrl',
    wrapperStyles: {
      mr: 20,
      width: 250
    }
  },
  {
    key: 'cookingTime',
    wrapperStyles: {
      width: 250
    }
  },
  {
    key: 'ingredientIcons',
    wrapperStyles: {
      width: 400
    }
  },
  {
    key: 'description',
    wrapperStyles: {
      width: '100%'
    }
  },
  {
    key: 'ingredients'
  },
  {
    key: 'direction'
  }
];

export const questionAnswerFields = [
  {
    key: 'column',
    wrapperStyles: {
      mr: 20,
      width: 150
    }
  },
  {
    key: 'question',
    wrapperStyles: {
      mr: 20,
      width: 'calc(50% - 100px)'
    }
  },
  {
    key: 'answer',
    wrapperStyles: {
      width: 'calc(50% - 100px)'
    }
  }
];
