import { Observable } from 'rxjs/Rx'
import { utf8ToHex } from 'web3-utils'

export default function(request, proxy, wrapper) {
    const web3 = wrapper.web3
    const [
        data,
        account
    ] = request.params

    // web3.eth.personal.sign returns throws an error so we're using sendAsync
    return new Promise((res, rej) => {
        web3.givenProvider.sendAsync({
            method: 'personal_sign',
            params: [utf8ToHex(data), account],
        }, function (err, result) {
            if (err) 
                return rej(err)
            
            res(result.result)
        })
    })
}