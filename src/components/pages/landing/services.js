import React, { PureComponent } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LockOpen from '@material-ui/icons/LockOpen';

const styles = {
    services: {
        padding: 25,
        height: 'calc(100vh - 70px)',
    },
    header: {
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& h3': {
            fontSize: '2.4rem',
            margin: 0,
        },
        '& h4': {
            fontSize: '1.6rem',
            color: '#4f545e',
        },
    },
    body: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 30,
        '& .item': {
            marginTop: 50,
            flex: '1 0 30%',
            display: 'flex',
            '& .icon': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: '0 0 auto',
                marginRight: 10,
                width: 80,
                height: 80,
                backgroundColor: '#eef9fd',
                borderRadius: 20,
                color: '#2f80ed',
            },
            '& .description': {
                '& h5': {
                    fontSize: '1.2rem',
                    margin: 10,
                },
                '& p': {
                    fontSize: '1rem',
                    marginTop: 21,
                    color: '#4f545e',
                    lineHeight: '20px',
                },
            },
        },
    },
};

class Services extends PureComponent {    
    render() {
        const { classes } = this.props;

        return (
            <section className={classes.services} id="services">
                <div className={classes.header}>
                    <h3>Services.</h3>
                    <h4>Services Subtitle</h4>
                </div>
                <div className={classes.body}>
                    <div className="item">
                        {/* <div className="icon">
                            <LockOpen />
                        </div> */}
                        <div className="description">
                            <h5>Open source</h5>
                            <p>
                                Its free and open source. The entire codebase is available on GitHub.
                            </p>
                        </div>
                    </div>
                    <div className="item">
                        {/* <div className="icon">
                            <LockOpen />
                        </div> */}
                        <div className="description">
                            <h5>Customizable</h5>
                            <p>
                                Each project requires specific requirements. We give you service to customize your project the admin panel and API.
                            </p>
                        </div>
                    </div>
                    <div className="item">
                        {/* <div className="icon">
                            <LockOpen />
                        </div> */}
                        <div className="description">
                            <h5>100% JavaScript</h5>
                            <p>
                                One language to rule them all. Use JavaScript everywhere: both for your front-end and your Headless CMS.
                            </p>
                        </div>
                    </div>

                    <div className="item">
                        {/* <div className="icon">
                            <LockOpen />
                        </div> */}
                        <div className="description">
                            <h5>Self-hosted</h5>
                            <p>Security is crucial for companies. Host your data safely, on your own servers. GDPR compliant.</p>
                        </div>
                    </div>
                    <div className="item">
                        {/* <div className="icon">
                            <LockOpen />
                        </div> */}
                        <div className="description">
                            <h5>RESTful or GraphQL</h5>
                            <p>
                                Consume the API from any client (React, Vue, Angular), mobile apps or even IoT, using REST or GraphQL.
                            </p>
                        </div>
                    </div>
                    <div className="item">
                        {/* <div className="icon">
                            <LockOpen />
                        </div> */}
                        <div className="description">
                            <h5>Extensible by design</h5>
                            <p>
                                Plugins system included. Install auth system, content management, custom plugins, and more, in seconds.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withStyles(styles)(Services);
