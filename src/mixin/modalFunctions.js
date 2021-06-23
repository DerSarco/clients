
import providersService from "@/services/providers.js";

export const modalFunctions = {
    data() {
        return {
          providers: [],
          providersSelected: [],
          providerText: "",
          show: true,
          showConfirmModal: false,
          showWarningProviders: false,
        };
      },
      methods: {
        resetInfoModal() {
          this.$emit("clearInfoModal");
        },
        getProviders() {
          providersService.get().then(({ data }) => {
            let options = [];
            for (const key in data) {
              let jsonOptions = {
                value: "",
                text: "",
              };
              jsonOptions.text = data[key].name;
              jsonOptions.value = data[key]._id;
              options.push(jsonOptions);
            }
            this.providers = options;
          });
        },
        onSubmit(event) {
          event.preventDefault();
    
          if (this.providersSelected.length === 0) {
            this.showWarningProviders = true;
            return;
          }
    
          this.$bvModal
            .msgBoxConfirm("Are you sure about to add this client?.", {
              title: "Confirm",
              size: "sm",
              buttonSize: "sm",
              okVariant: "success",
              okTitle: "Yes",
              cancelVariant: "danger",
              cancelTitle: "No",
              footerClass: "p-2",
              hideHeaderClose: false,
              centered: true,
            })
            .then((value) => {
              if (value) {
                let providersSelected = [];
                for (const key in this.providersSelected) {
                  let jsonProviders = {
                    _id: this.providersSelected[key],
                  };
                  providersSelected.push(jsonProviders);
                }
                this.form.providers = providersSelected;
                this.$emit("createFromModal");
                this.$refs["modal-form"].hide();
                this.clearFormValues();
              }
            })
            .catch((err) => {
              // An error occurred
              console.log(err);
            });
        },
        onReset(event) {
          event.preventDefault();
          // Reset our form value
          this.clearFormValues();
        },
        clearFormValues() {
          this.providersSelected = [];
          this.show = false;
          this.$emit("closedModal");
          this.$nextTick(() => {
            this.show = true;
          });
        },
        deleteClientModal() {
          this.$bvModal
            .msgBoxConfirm("Are you sure about to delete this client?.", {
              title: "Confirm",
              size: "sm",
              buttonSize: "sm",
              okVariant: "success",
              okTitle: "Yes",
              cancelVariant: "danger",
              cancelTitle: "No",
              footerClass: "p-2",
              hideHeaderClose: false,
              centered: true,
            })
            .then((value) => {
              if (value) {
                this.$emit("deleteFromModal");
                this.$refs["modal-form"].hide();
                this.clearFormValues();
              }
            })
            .catch((err) => {
              // An error occurred
              console.log(err);
            });
        },
        addNewProvider() {
          if (this.providerText === "") {
            return;
          }
          this.$bvModal
            .msgBoxConfirm("Are you sure about to add this provider?.", {
              title: "Confirm",
              size: "sm",
              buttonSize: "sm",
              okVariant: "success",
              okTitle: "Yes",
              cancelVariant: "danger",
              cancelTitle: "No",
              footerClass: "p-2",
              hideHeaderClose: false,
              centered: true,
            })
            .then((value) => {
              if (value) {
                let data = {
                  name: this.providerText,
                };
                providersService.create(data).then((resp) => {
                  console.log(resp);
                  if (resp.status === 200) {
                    this.getProviders();
                  }
                });
              }
            })
            .catch((err) => {
              // An error occurred
              console.log(err);
            });
        },
        deleteProvider(id) {
          this.$bvModal
            .msgBoxConfirm("Are you sure about to delete this provider?.", {
              title: "Confirm",
              size: "sm",
              buttonSize: "sm",
              okVariant: "success",
              okTitle: "Yes",
              cancelVariant: "danger",
              cancelTitle: "No",
              footerClass: "p-2",
              hideHeaderClose: false,
              centered: true,
            })
            .then((value) => {
              if (value) {
                providersService.delete(id).then((resp) => {
                  console.log(resp);
                  if (resp.status === 204) {
                    this.getProviders();
                    let index = this.providersSelected.findIndex(
                      (element) => element === id
                    );
                    if (index > -1) {
                      this.providersSelected.splice(index, 1);
                    }
                  }
                });
              }
            })
            .catch((err) => {
              // An error occurred
              console.log(err);
            });
        },
      }

}