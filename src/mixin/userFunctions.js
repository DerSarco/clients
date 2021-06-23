
import clients from "@/services/clients.js";

export const userFunctions = {
    data() {
        return {
            items: [],
            totalRows: 1,
            infoModal: {
                id: "info-modal",
                title: "",
                content: "",
                edit: false,
            },
            form: {
                _id: "",
                name: "",
                email: "",
                phone: "",
                providers: [],
            },
        }
    },
    methods: {
        createClient(item, index, button) {
            this.form = {
                name: "",
                email: "",
                phone: "",
                providers: [],
            };
            this.infoModal.title = `Client Creation`;
            this.infoModal.edit = false;
            this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        },
        clientFetch() {
            if (this.infoModal.edit) {
                clients.update(this.form._id, this.form).then((resp) => {
                    console.log(resp);
                    this.getClients();
                });
            } else {
                clients.create(this.form).then((resp) => {
                    console.log(resp);
                    this.getClients();
                });
            }
        },
        info(item, index, button) {
            this.infoModal.title = `Client Edit: ${item.name}`;
            this.form._id = item._id;
            this.form.name = item.name;
            this.form.email = item.email;
            this.form.phone = item.phone;
            this.infoModal.content = JSON.stringify(item, null, 2);
            this.infoModal.edit = true;
            this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        },
        resetInfoModal() {
            this.infoModal.title = "";
            this.infoModal.content = "";
        },
        deleteUser(id) {
            this.$bvModal
                .msgBoxConfirm("Are you sure about to add this client?.", {
                    title: "Confirm",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "accept",
                    okTitle: "Yes",
                    cancelTitle: "No",
                    footerClass: "p-2",
                    hideHeaderClose: false,
                    centered: true,
                })
                .then(() => {
                    this.fetchClientDelete(id)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        fetchClientDelete(id) {
            clients
                .delete(id)
                .then((resp) => {
                    if (resp.status === 204) {
                        let index = this.items.findIndex(
                            (element) => element._id === id
                        );
                        if (index > -1) {
                            this.items.splice(index, 1);
                        }
                    }
                    this.getClients();
                })
                .catch(console.log);
        },
        getClients() {
            clients.get().then((resp) => {
                console.log(resp);
                this.items = resp.data;
                this.totalRows = this.items.length;
            });
        },
    }
}