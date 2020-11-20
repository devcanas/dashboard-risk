#!/usr/bin/python2.7
import xlrd
import xlwt
import json
import os.path
import datetime

def getColNames(sheet):
	rowSize = sheet.row_len(0)
	colValues = sheet.row_values(0, 0, rowSize )
	columnNames = []

	for value in colValues:
		columnNames.append(value)

	return columnNames

def getRowData(row, columnNames):
	rowData = {}
	counter = 0

	for cell in row:
		# check if it is of date type print in iso format
		if cell.ctype==xlrd.XL_CELL_DATE:
			rowData[columnNames[counter]] = datetime.datetime(*xlrd.xldate_as_tuple(cell.value,0)).strftime("%Y-%m-%d")
		else:
			rowData[columnNames[counter]] = cell.value
		counter +=1

	return rowData

def getSheetData(sheet, columnNames):
	nRows = sheet.nrows
	sheetData = []
	counter = 1

	for idx in range(1, nRows):
		row = sheet.row(idx)
		rowData = getRowData(row, columnNames)
		sheetData.append(rowData)

	return sheetData

def getWorkBookData(workbook):
	nsheets = workbook.nsheets
	counter = 0
	workbookdata = {}

	for idx in range(0, nsheets):
		worksheet = workbook.sheet_by_index(idx)
		columnNames = getColNames(worksheet)
		sheetdata = getSheetData(worksheet, columnNames)
		workbookdata[worksheet.name] = sheetdata

	return workbookdata

def main():
	filename = "/Users/devcanas/Downloads/nos.xlsx"
	workbook = xlrd.open_workbook(filename)
	workbookdata = getWorkBookData(workbook)
	output = \
	open((filename.replace("xlsx", "json")).replace("xls", "json"), "w+")
	output.write(json.dumps(workbookdata, sort_keys=True, indent=2,  separators=(',', ": ")))
	output.close()
	print ("%s was created" %output.name)

main()
