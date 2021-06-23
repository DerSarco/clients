import Service from "./Service";

const resource = 'clients';

export default {
    get(){
        return Service.get(resource);
    },
    delete(id){
        return Service.delete(`${resource}/${id}`);
    },
    create(data){
        return Service.post(resource, data);
    },
    update(id, data){
        return Service.patch(`${resource}/${id}`, data);
    }
}