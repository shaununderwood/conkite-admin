import React from "react";
import { inject, observer } from "mobx-react";
import MaterialTable from "material-table";
import { DatePicker } from "@material-ui/pickers";
import { Typography } from "@material-ui/core";
import { toJS } from "mobx";
import { formatDate, formatDateMMDDYYYYfromYYYYMMDD, correctTimezone, saveChangeDateCurry } from "../libs/common";
import PaymentsNotesTabs from "./PaymentOrNotesTabs";


const extractDatePart = value => {
	return (new Date(value).toJSON() || "").substr(0, 10);
};
const toInt = value =>
	parseInt(
		extractDatePart(value)
			.split("-")
			.join("")
	);
const subscribed = value => {
	let subdate = toInt(value);
	let todaydate = toInt(new Date());
	return todaydate > subdate;
};

@inject("store")
@observer
class App extends React.Component<{
	store?;
	props?;
}> {
	async componentDidMount() {
		await this.props.store.app.fetchUsers();
	}

	render() {
		return (
			<MaterialTable
				isLoading={this.props.store.app.isLoadingUsers}
				title={`Corrlink Users`}
				data={this.props.store.app.users}
				options={{
					pageSize: 10,
					search: true,
					exportButton: true,
					filtering: true,
					sorting: true,
					columnsButton: true
				}}
				columns={[
					{
						cellStyle: { width: "10%" },
						title: "ID",
						field: "corrlinks_id",
						defaultSort: "desc",
						editable: "onAdd",
						type: "numeric" // string with only 0-9, leading 0 allowed
					},
					{
						title: "NAME",
						field: "name",
						defaultSort: "desc",
						editable: "always"
					},
					{
						title: "MESSAGING SUBSCRIPTION",
						field: "date_subscription_ends",
						defaultSort: "desc",
						editable: "always",
						initialEditValue: () => {
							return new Date();
						},
						render: props => {
							const color = subscribed(props.date_subscription_ends) ? "red" : "green";
							return <Typography style={{ color }}>{formatDateMMDDYYYYfromYYYYMMDD(props.date_subscription_ends)}</Typography>;
						},
						editComponent: props => {
							return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
						}
					},
					{
						title: "STATUS",
						field: "date_subscription_ends",
						defaultSort: "desc",
						editable: "never",
						render: props => {
							const color = subscribed(props.date_subscription_ends) ? "red" : "green";
							return <Typography style={{ color }}>{color === "red" ? "UNPAID" : "PAID"}</Typography>;
						}
					},
					{	title: "DATE CREATED",
						field: "date_created",
						defaultSort: "desc",
						editable: "never"
					},
					{
						title: "EMAIL",
						field: "corrlinks_account",
						defaultSort: "desc",
						editable: "always"
					},
					{
						title: "PRISON",
						field: "location",
						defaultSort: "desc",
						editable: "always"
					},
					{
						title: "RELEASE DATE",
						field: "date_release",
						defaultSort: "desc",
						editable: "onUpdate",
						render: props => {
							return <Typography>{formatDate(props ? formatDateMMDDYYYYfromYYYYMMDD(props.date_release) : "-")}</Typography>;
						},
						editComponent: props => {
							return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
						}
					},
					{
						title: "PHONEBOOK UPDATE START DATE",
						field: "adhoc_phonebook_edit_window_date_start",
						defaultSort: "desc",
						editable: "onUpdate",
						render: props => {
							return <Typography>{formatDate(props ? formatDateMMDDYYYYfromYYYYMMDD(props.adhoc_phonebook_edit_window_date_start) : "-")}</Typography>;
						},
						editComponent: props => {
							return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
						}
					},
					{
						title: "PHONEBOOK UPDATE END DATE",
						field: "adhoc_phonebook_edit_window_date_end",
						defaultSort: "desc",
						editable: "onUpdate",
						render: props => {
							return <Typography>{formatDate(props ? formatDateMMDDYYYYfromYYYYMMDD(props.adhoc_phonebook_edit_window_date_end) : "-")}</Typography>;
						},
						editComponent: props => {
							return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
						}
					},
					//{
					//	title: "phonebook expiration date",
					//	field: "date_phonebook_subscription_ends",
					//	defaultSort: "desc",
					//	editable: "always",
					//	render: props => {
					//		if (!props) return null;
					//		const color = subscribed(props.date_phonebook_subscription_ends) ? "red" : "green";
					//		return <Typography style={{ color }}>{formatDateMMDDYYYYfromYYYYMMDD(props.date_phonebook_subscription_ends)}</Typography>;
					//	},
					//	editComponent: props => {
					//		return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
					//	}
					//},
					{
						title: "HOROSCOPE SUBSCRIPTION",
						field: "date_horoscope_subscription_ends",
						defaultSort: "desc",
						editable: "always",
						render: props => {
							if (!props) return null;
							const color = subscribed(props.date_horoscope_subscription_ends) ? "red" : "green";
							return <Typography style={{ color }}>{formatDateMMDDYYYYfromYYYYMMDD(props.date_horoscope_subscription_ends)}</Typography>;
						},
						editComponent: props => {
							return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
						}
					},
					{
						title: "NEWS SUBSCRIPTION",
						field: "date_news_subscription_ends",
						defaultSort: "desc",
						editable: "always",
						render: props => {
							if (!props) return null;
							const color = subscribed(props.date_news_subscription_ends) ? "red" : "green";
							return <Typography style={{ color }}>{formatDateMMDDYYYYfromYYYYMMDD(props.date_news_subscription_ends)}</Typography>;
						},
						editComponent: props => {
							return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
						}
					},
					{
						title: "SPORTS SUBSCRIPTION",
						field: "date_sports_subscription_ends",
						defaultSort: "desc",
						editable: "always",
						render: props => {
							if (!props) return null;
							const color = subscribed(props.date_sports_subscription_ends) ? "red" : "green";
							return <Typography style={{ color }}>{formatDateMMDDYYYYfromYYYYMMDD(props.date_sports_subscription_ends)}</Typography>;
						},
						editComponent: props => {
							return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
						}
					},
					{
						title: "INVESTMENT SUBSCRIPTION",
						field: "date_investments_subscription_ends",
						defaultSort: "desc",
						editable: "always",
						render: props => {
							if (!props) return null;
							const color = subscribed(props.date_investments_subscription_ends) ? "red" : "green";
							return <Typography style={{ color }}>{formatDateMMDDYYYYfromYYYYMMDD(props.date_investments_subscription_ends)}</Typography>;
						},
						editComponent: props => {
							return <DatePicker value={correctTimezone(props.value)} onChange={saveChangeDateCurry(props)} />;
						}
					},
					{
						title: "ESCROW",
						field: "credits",
						defaultSort: "desc",
						editable: "always",
						type: "numeric",
					},
					//{
					//	title: "Phonebook Entries",
					//	field: "phonebook_entries_allowed",
					//	defaultSort: "desc",
					//	editable: "always",
					//	initialEditValue: 15,
					//},
					//{
					//	title: "Notes",
					//	field: "notes",
					//	defaultSort: "desc",
					//	editable: "always"
					//},
					// {
					//	title: "Uses Phonebook?",
					//	field: "use_phonebook",
					//	defaultSort: "desc",
					//	editable: "always",
					//	render: props => <Typography>{props.use_phonebook === 0 ? "No" : "Yes"}</Typography>,
					//	editComponent: props => (
					//		<Select value={props.value} onChange={event => props.onChange(event.target.value)}>
					//			<MenuItem key={0} value={0}>
					//				No
					//			</MenuItem>
					//			<MenuItem key={1} value={1}>
					//				Yes
					//			</MenuItem>
					//		</Select>
					//	)
					//},
					// {
					//	title: "Email",
					//	field: "corrlinks_account",
					//	defaultSort: "desc",
					//	editable: "always"
					// },
					// {
					// 	title: "Server Status",
					// 	field: "status",
					// 	defaultSort: "desc",
					// 	editable: "always",
					// 	editComponent: props => (
					// 		<Select
					// 			value={props.value}
					// 			onChange={event => {
					// 				console.log(event);
					// 				return props.onChange(event.target.value);
					// 			}}>
					// 			{statuses.map((a, i) => <MenuItem key={i} value={a.value}>{a.text}</MenuItem>)}
					// 		</Select>
					// 	)
					// },
				]}
				editable={{
					isEditable: (rowData: any) => true,
					isDeletable: (rowData: any) => false,
					onRowUpdate: (newData, oldData) =>
						new Promise(async (resolve, reject) => {
							const corrlinks_id = oldData.corrlinks_id;
							try {
								validate(newData);
								await this.props.store.app.updateUser({
									corrlinks_id,
									user: newData
								});
								resolve(null);
							} catch (e) {
								reject();
							}
						}),
					onRowDelete: oldData =>
						new Promise(async (resolve, reject) => {
							try {
								await this.props.store.app.deleteUser({
									corrlinks_id: oldData.corrlinks_id
								});
								resolve(null);
							} catch (e) {
								console.log(e);
								alert(e);
								reject();
							}
						}),
					onRowAdd: newData =>
						new Promise(async (resolve, reject) => {
							try {
								validate(newData);
								await this.props.store.app.addUser({ user: newData });
								resolve(null);
							} catch (e) {
								console.log(e);
								alert(e);
								reject();
							}
						})
				}}
				detailPanel={props => <PaymentsNotesTabs user={toJS(props)} />}
			/>
		);
	}
}
function validate(a) {
	if (!a.corrlinks_id || ("" + a.corrlinks_id).length < 8) throw new Error("corrlinks_id must be 8 digits long");
	if (!a.name || a.name.lengt < 1) throw new Error("name required");
	if (!a.date_subscription_ends || !new Date(a.date_subscription_ends).valueOf()) throw new Error("date_subscription_ends must be a valid date");
	return true;
}

export default App;
