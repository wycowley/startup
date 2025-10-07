def search(array, start=0, end=None):
    if end is None:
        end = len(array) - 1
    if start > end:
        return False
    mid = (start + end) // 2
    if array[mid] == mid:
        return True
    elif array[mid] > mid:
        return search(array, start, mid - 1)
    else:
        return search(array, mid + 1, end)

print(search([3,0,0,0,0,5,5]))