import Service from "./Service";

const resource = 'providers';

export default {
    get(){
        return Service.get(resource);
    },
    delete(id){
        return Service.delete(`${resource}/${id}`);
    },
    create(data){
        return Service.post(resource, data);
    }
}