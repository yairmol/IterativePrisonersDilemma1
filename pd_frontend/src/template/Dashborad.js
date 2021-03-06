import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from '../Chart';
import Games from './Games';
import GameConfig from "../GameConfig";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Title from "./Title";
import CreateStrategy from "../CreateStrategy";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import IterationsChart from "../IterationsChart";
import Button from "@material-ui/core/Button";
import PieChartModule from "../evoResChart"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    fixedHeight2: {
        height: 300,
    },
}));

const colors = ["#ed553b", "#f6d55c", "#3caea3", "#20639b",
    "#7268a6", "#32a852"];

export default function Dashboard() {
    const classes = useStyles();
    const [matchMade, setMatchMade] = React.useState(false);
    const [games, setGames] = React.useState([]);
    const [scores, setScores] = React.useState([]);
    const [quantities, setQuantities] = React.useState([]);
    const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
    const [open, setOpen] = React.useState(false);
    const [selectedPage, setSelectedPage] = React.useState("Dashboard");
    const [selected_iteration, setSelectedIteration] = React.useState(0);
    const [colorMap, setColorMap] = React.useState({});
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const updateData = (data) => {
        // alert("got results");
        setGames(data.games);
        setScores(data.scores);
        setQuantities(data.quantities);
        // alert(JSON.stringify(scores));
        setMatchMade(true);
        let strats = [];
        for (let strat in data.quantities[0]){
            strats = strats.concat([strat]);
        }
        let colorMapping = {};
        let i = 0;
        for (const i in strats) {
            colorMapping[strats[i]] = colors[i%colors.length];
        }
        setColorMap(colorMapping);
    };

    const getStrategies = () => {
        let strats = [];
        for (let strat in quantities[0]){
            strats = strats.concat([strat]);
        }
        return strats
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Iterative Prisoners Dilemma
                    </Typography>
                    {/*<IconButton color="inherit">*/}
                    {/*    <Badge badgeContent={4} color="secondary">*/}
                    {/*        <NotificationsIcon />*/}
                    {/*    </Badge>*/}
                    {/*</IconButton>*/}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List><div>
                    <ListItem button onClick={() => setSelectedPage("Dashboard")}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Match Making" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedPage("CreateStrategy")}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Strategy" />
                    </ListItem>
                </div></List>
            </Drawer>
                <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container style={{float: "left"}} maxWidth="lg" className={classes.container}>
                    {selectedPage === "Dashboard" ?
                        (<Grid container spacing={3}>
                        {/* Game Configurations */}
                        <Grid item xs={12} md={12} lg={12}>
                            {!matchMade ?
                                (<Paper className={fixedHeightPaper2}><GameConfig updateData={updateData}/></Paper>) :
                                (<Paper className={classes.paper}>
                                    <IterationsChart colors={colorMap} quantities={quantities} setIter={setSelectedIteration}/>
                                    <Button onClick={() => setMatchMade(false)}
                                            type="button"
                                            color="primary"
                                            className={classes.button}
                                            variant="outlined">Clear results</Button>
                                </Paper>)
                            }
                        </Grid>
                        {/*<Grid item xs={12} md={6} lg={5}>*/}
                        {/*    <Paper className={fixedHeightPaper2}>*/}
                        {/*        <Games games={games}/>*/}
                        {/*    </Paper>*/}
                        {/*</Grid>*/}
                            {matchMade ?
                                (<Grid item xs={6} md={8} lg={8}>
                                    <Paper className={classes.paper}>
                                        <Chart colors={colorMap}  iteration={selected_iteration} scores={scores[selected_iteration]}/>
                                    </Paper>
                                </Grid>) : null
                            }
                            {matchMade ?
                                (<Grid item xs={6} md={4} lg={4}>
                                    <Paper className={classes.paper}>
                                        <PieChartModule colors={colorMap} iteration={selected_iteration} scores={quantities[selected_iteration]}/>
                                    </Paper>
                                </Grid>) :
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Typography component="h1" variant="h6">Match wasn't made yet</Typography>
                                    </Paper>
                                </Grid>
                            }
                    </Grid>) : <CreateStrategy/>}
                </Container>
            </main>
        </div>
    );
}