import React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Typography from '@mui/material/Typography';
import {colors} from '../../theme/colors';
import {withStyles} from '@mui/styles';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import {formatCurrencyWithPrecision, heightSize, widthSize} from '../../Utilities';
import {ChartData, Gains} from '../../models/Portfolio';

const StyledTableContainer = withStyles(() => ({
    root: {
        maxHeight: heightSize(70),
        // position:'relative',
        overflow: 'auto',
        backgroundColor: 'transparent',
        borderRadius: 0,
        minHeight: heightSize(70),
        display: 'flex',
        width: '100%',
        '&::-webkit-scrollbar': {
            width: widthSize(8),
            height: heightSize(8),
            display: 'none',
        },
        bottom: 0,
        right: 0,
        left: 0,
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.primary.grey50,
            borderRadius: '10px',
        },
        '&:hover': {
            '&::-webkit-scrollbar': {
                display: 'unset',
            },
        },
    },
}))(TableContainer);

interface Footer {
    balance: string;
    gains: Gains;
    history: ChartData[];
    footerType: string;
}

export const CollapsibleTablesFooter = ({balance, gains, history}: Footer) => {
    return (
        <StyledTableContainer style={{borderBottom: 0, bottom: 0}}>
            <Table aria-label="collapsible table">
                {gains && (
                    <TableFooter style={{background: colors.background.grey}}>
                        <TableRow>
                            <TableCell
                                sx={{
                                    minWidth: '20px',
                                    background: colors.primary.blue80,
                                    borderTop: 3,
                                    borderBottom: 0,
                                    borderBottomColor: colors.primary.blue50,
                                    borderTopColor: colors.primary.blue50,
                                }}
                                align="left"
                            >
                                {' '}
                            </TableCell>
                            <TableCell
                                sx={{
                                    minWidth: '300px',
                                    background: colors.primary.blue80,
                                    borderTop: 3,
                                    borderBottom: 0,
                                    borderTopColor: colors.primary.blue50,
                                }}
                                align="left"
                            >
                                <Typography variant={'body1'} color={colors.primary.white}>
                                    Total
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    minWidth: '200px',
                                    background: colors.primary.blue80,
                                    borderTop: 3,
                                    borderBottom: 0,
                                    borderTopColor: colors.primary.blue50,
                                }}
                                align="left"
                            >
                                <Typography variant={'h4'} color={colors.primary.white}>
                                    {formatCurrencyWithPrecision(Number(balance), 2)}
                                </Typography>
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{
                                    minWidth: '200px',
                                    maxWidth: '100px',
                                    background: colors.primary.blue80,
                                    borderTop: 3,
                                    borderBottom: 0,
                                    borderTopColor: colors.primary.blue50,
                                }}
                            >
                                <TableCell sx={{minWidth: '130px', borderBottom: 0}} align="left">
                                    <Sparklines
                                        data={history.map((d) => {
                                            return Number(d.marketValue);
                                        })}
                                    >
                                        <SparklinesLine
                                            style={{
                                                minWidth: '100px',
                                                maxWidth: '100px',
                                                fill: 'none',
                                                strokeWidth: 6,
                                                align: 'left',
                                            }}
                                            color={
                                                Number(gains.weekPercentage) >= 0
                                                    ? colors.status.green
                                                    : colors.status.red
                                            }
                                        />
                                    </Sparklines>
                                </TableCell>
                            </TableCell>

                            <TableCell
                                sx={{
                                    minWidth: '200px',
                                    background: colors.primary.blue80,
                                    borderTop: 3,
                                    borderBottom: 0,
                                    borderTopColor: colors.primary.blue50,
                                }}
                                align="left"
                            >
                                <Typography variant={'h4'} color={colors.primary.white}>
                                    {formatCurrencyWithPrecision(Number(gains.day), 2)}
                                </Typography>
                                <Typography
                                    variant={'body2'}
                                    color={Number(gains.dayPercentage) >= 0 ? colors.status.green : colors.status.red}
                                >
                                    {formatCurrencyWithPrecision(Number(gains.dayPercentage), 1)}%
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    minWidth: '200px',
                                    background: colors.primary.blue80,
                                    borderTop: 3,
                                    borderBottom: 0,
                                    borderTopColor: colors.primary.blue50,
                                }}
                                align="left"
                            >
                                <Typography variant={'h4'} color={colors.primary.white}>
                                    {formatCurrencyWithPrecision(Number(gains.week), 2)}
                                </Typography>
                                <Typography
                                    variant={'body2'}
                                    color={Number(gains.weekPercentage) >= 0 ? colors.status.green : colors.status.red}
                                >
                                    {formatCurrencyWithPrecision(Number(gains.weekPercentage), 1)}%
                                </Typography>
                            </TableCell>
                            <TableCell
                                sx={{
                                    minWidth: '200px',
                                    background: colors.primary.blue80,
                                    borderTop: 3,
                                    borderBottom: 0,
                                    borderTopColor: colors.primary.blue50,
                                }}
                                align="left"
                            >
                                <Typography variant={'h4'} color={colors.primary.white}>
                                    {formatCurrencyWithPrecision(Number(gains.month), 2)}
                                </Typography>
                                <Typography
                                    variant={'body2'}
                                    color={Number(gains.monthPercentage) >= 0 ? colors.status.green : colors.status.red}
                                >
                                    {formatCurrencyWithPrecision(Number(gains.monthPercentage), 1)}%
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </StyledTableContainer>
    );
};

export default CollapsibleTablesFooter;
