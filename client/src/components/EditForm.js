import React, {useState, useEffect} from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Container, Button} from 'react-bootstrap';

const EditForm = (props) => {
    <Container className='w-100'>
        <p>{props.itemName}</p>
        <p>{props.purchasePrice}</p>
        <p>{props.purchaseDate}</p>
    </Container>
}

export default EditForm;