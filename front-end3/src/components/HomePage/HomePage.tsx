import React from 'react';
import { Container, Card, Row, Col, Carousel } from 'react-bootstrap';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryType from '../../types/CategoryType';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';

interface HomePageState {
    isUserLoggedIn: boolean;
    categories?: CategoryType[];
}

interface ApiCategoryDto {
    categoryId: number;
    name: string;
}

interface ImgType {
    imgUrl: string;
    caption: string;
    imgAlt: string;
}

interface NewsType {
    title: string;
    text: string;
}

class HomePage extends React.Component {
    state: HomePageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isUserLoggedIn: true,
            categories: [],
        };
    }

    componentWillMount() {
        this.getCategories();
    }

    componentWillUpdate() {
        this.getCategories();
    }

    private getCategories() {
        api('api/category/', 'get', {})//?filter=parentCategoryId||$isnull 
        .then((res: ApiResponse) => {
            if (res.status === "error" || res.status === "login") {
                this.setLogginState(false);
                return;
            }

            this.putCategoriesInState(res.data);
        });
    }

    private putCategoriesInState(data?: ApiCategoryDto[]) {
        const categories: CategoryType[] | undefined = data?.map(category => {
            return {
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

    private setLogginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isLoggedIn,
        });

        this.setState(newState);
    }

    // Img Carousel *************************************************************
    //dummy images
    private images: Array<ImgType> = [
        {
            imgUrl: "https://source.unsplash.com/vdbq-iiyvGY/800x600",
            caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate pellentesque convallis. Aenean lacinia nunc quis malesuada cursus.",
            imgAlt: "Milk",
        },
        {
            imgUrl: "https://source.unsplash.com/4z0-2mQE7io/800x600",
            caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate pellentesque convallis. Aenean lacinia nunc quis malesuada cursus.",
            imgAlt: "Our Store",
        },
        {
            imgUrl: "https://source.unsplash.com/1DMNn6gBbwQ/800x600",
            caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate pellentesque convallis. Aenean lacinia nunc quis malesuada cursus.",
            imgAlt: "New Product",
        },
    ]

    private carouselItem({ imgUrl, caption, imgAlt }: ImgType) {
        return (<Carousel.Item>
            <img
                className="d-block w-100"
                src={imgUrl}
                alt={imgAlt}
            />
            {/* <Carousel.Caption>
                {caption}
            </Carousel.Caption> */}
        </Carousel.Item>)
    }
    // Img Carousel End ##################

    // News **************************

    //dummy news
    private news: Array<NewsType> = [
        {
            title: "Curabitur vulputate",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Consectetur vulputate",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Pellentesque vulputate",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ]

    private newsItem({ title, text }: NewsType) {
        return (<Card border="info" className="mx-3 my-2" >
            <Card.Body>

                <Card.Title as="h6" >
                    {title}
                </Card.Title>
                <Card.Text as="p">
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>)
    }
    // News End *************************************************************

    render() {
        /* if (this.state.isUserLoggedIn === false) {
            return (
                <Redirect to="/user/login" />
            );
        }
    */

        return (
            <Container>
                <Card>
                    <Card.Body>

                        <Card.Title>
                            <FontAwesomeIcon icon={faListAlt} /> Top level categories
                        </Card.Title>

                        <Row>
                            <Col lg="9" md="9" sm="12" xs="12">
                                {this.state.categories?.map(this.singleCategory)}
                            </Col>
                            <Col lg="3" md="3" sm="12" xs="12">
                                <Carousel controls={false}>
                                    {this.images.map(this.carouselItem)}
                                </Carousel>
                                <Row>
                                    {this.news.map(this.newsItem)}
                                </Row>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Container>
        );
    }
    private singleCategory(category: CategoryType) {
        return (
            <Col lg="3" md="4" sm="6" xs="12">
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title as="p">
                            { category.name }
                        </Card.Title>
                        <Link to={ `/category/${ category.categoryId }` }
                              className="btn btn-primary btn-block btn-sm">
                            Open category
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}

export default HomePage;