import React from 'react';
import {Container, Card, Row, Col} from 'react-bootstrap';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { faHome, faListAlt } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { MainMenu } from '../MainMenu/MainMenu';
import CategoryType from '../../types/CategoryType';
import { Redirect, Link } from 'react-router-dom';
import api, {ApiResponse} from '../../api/api';


interface HomePageState {
    isAdminLoggedIn: boolean;
    categories: CategoryType[];
}
interface ApiCategoryDto{
  categoryId: number;
  name: string;
}

class HomePage extends React.Component {
   state: HomePageState;
  setAdminLoggedInState: any;

   constructor(props: Readonly<{}>){
     super(props);

     this.state={
       isAdminLoggedIn: true,
       categories: [],

     };
   }

   componentWillMount(){
     this.getCategories();
   }

   componentWillUpdate(){
     this.getCategories();
   }

   private getCategories(){
       api('api/category/', 'get', {})
       .then((res: ApiResponse)=>{
          if(res.status==="error"|| res.status==="login"){
            this.setAdminLoggedInState(false);
            return;
          }
          this.putCategoriesInState(res.data);
      });

   }
   private putCategoriesInState(data: ApiCategoryDto[]){
       const categories: CategoryType[]= data.map(category =>{
          return{
            categoryId: category.categoryId,
            name: category.name,
            items: [],

          };
       });
       const newState = Object.assign(this.state, {
        categories: categories,
    });

        this.setState(newState);
   }

   private setAdminLogginState(isLoggedIn: boolean) {
    const newState = (Object.assign(this.state, {
      isAdminLoggedIn: isLoggedIn,
    }));

    this.setState(newState);
  }

  render(){
    if (this.state.isAdminLoggedIn=== false) {
      return (
          <Redirect to="/admin/login" />
      );
    }
      return (
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={ faHome } /> Home Page
              </Card.Title>
  
              <Row>
                { this.state.categories.map(this.renderSingleCategory) }
              </Row>
            </Card.Body>
          </Card>
        </Container>
      );
    
  }

  private renderSingleCategory(category: CategoryType) {
    return (
      <Col xs="12" sm="6" md="4" lg="3">
        <Card className="mb-3">
          <Card.Body>
            <Card.Title as="p">
              <strong>
                { category.name }
              </strong>
            </Card.Title>
            <Link to={ `category/${ category.categoryId }/` }
                  className="btn btn-sm btn-primary btn-block">
              Click to open
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default HomePage;
